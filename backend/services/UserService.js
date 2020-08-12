const firebaseAdmin = require("firebase-admin");
const get = require("lodash/get");
const mergeDeep = require("lodash/merge");
const json2csv = require("json2csv");
const db = firebaseAdmin.database();
const userRef = db.ref("server/saving-data/fireblog/users");
const appStateRef = db.ref("server/saving-data/fireblog/appState");

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max - min);
  rand = Math.round(rand);

  return rand;
};

function getUniqIndexes({ from, to, limit }) {
  if (
    to < from ||
    isNaN(parseInt(from)) ||
    isNaN(parseInt(to)) ||
    isNaN(parseInt(limit))
  ) {
    return [];
  }

  const res = [];
  if (+limit > to - from + 1) {
    limit = to - from + 1;
  }

  while (res.length < +limit) {
    const currentIndex = randomInteger(from, to);
    if (res.indexOf(currentIndex) === -1) {
      res.push(currentIndex);
    }
  }

  return res;
}

class UserService {
  async getUserById(uid) {
    let result = {};

    await userRef.child(uid).once("value", snap => {
      result = snap.val();
    });

    return {
      ...result,
      uid
    };
  }

  async registerNewUser(data) {
    const { uid, login, steamLogin, country, email, subscribe } = data;

    try {
      return await userRef.update({
        [uid]: {
          role: "user",
          steamLogin,
          email,
          country,
          login,
          subscribe
        }
      });
    } catch (err) {
      console.log("ERROR DB UPDATE USER FOR", uid);
      console.log(err);
    }
  }

  async generateLocaleWinners(params) {
    const { limit = 10 } = params;

    let participants = [];
    let winners = [];
    const created = Date.now();

    try {
      await userRef.once("value", snapshot => {
        participants = Object.entries(snapshot.val()).map(([uid]) => {
          return uid;
        });
        // .filter(({ data }) => data.clicks > 10);
      });
    } catch (err) {
      console.log("ERROR DB GET TOP CLICKERS");
      console.log(err);

      return participants;
    }

    const participantsNumber = participants.length - 1;
    const winnersIndexes = getUniqIndexes({
      from: 0,
      to: participantsNumber,
      limit
    });

    for (let idx of winnersIndexes) {
      winners.push(participants[idx]);
    }

    try {
      await appStateRef.update({
        localWinners: winners,
        created
      });
    } catch (err) {
      console.log("ERROR DB UPDATE WINNERS LIST", winners);
      console.log(err);
    }

    const winnerList = await Promise.all(
      winners.map(uid => this.getUserById(uid))
    );

    return [winnerList, created];
  }

  async generateSecretWinners(params) {
    const { limit = 1 } = params;

    let participants = [];
    let winners = [];
    const created = Date.now();

    try {
      await userRef.once("value", snapshot => {
        participants = Object.entries(snapshot.val())
          .filter(([key, user]) => !!user.promocode)
          .map(([uid]) => {
            return uid;
          });
      });
    } catch (err) {
      console.log("ERROR DB GET generateSecretWinners");
      console.log(err);

      return participants;
    }

    const participantsNumber = participants.length - 1;
    const winnersIndexes = getUniqIndexes({
      from: 0,
      to: participantsNumber,
      limit
    });

    for (let idx of winnersIndexes) {
      winners.push(participants[idx]);
    }

    if (!winners.length) {
      return [[], created];
    }

    try {
      await appStateRef.update({
        secretWinners: winners
      });
    } catch (err) {
      console.log("ERROR DB UPDATE generateSecretWinners", winners);
      console.log(err);
    }

    const winnerList = await Promise.all(
      winners.map(uid => this.getUserById(uid))
    );

    return [winnerList, created];
  }

  async getWinners(params) {
    const { limit = 10 } = params;
    let winners = [];
    let created = 0;

    try {
      await appStateRef.once("value", snapshot => {
        winners = get(snapshot.val(), "localWinners", []);
        created = get(snapshot.val(), "created", []);
      });
    } catch (err) {
      console.log("ERROR DB GET WINNERS");
      console.log(err);

      return [];
    }

    const winnerList = await Promise.all(
      winners.map(uid => this.getUserById(uid))
    );

    return [winnerList, created];
  }

  async getAllUsers() {
    let participants = {};

    try {
      await userRef.once("value", snapshot => {
        participants = snapshot.val() || {};
      });
    } catch (err) {
      console.log("ERROR DB GET TOP CLICKERS");
      console.log(err);
    }

    return Object.values(participants);
  }

  async getAllUsersInCSV() {
    const participants = await this.getAllUsers();

    const resJSON = participants.map((data, i) => ({ idx: i + 1, ...data }));

    const fields = [
      "idx",
      "email",
      "login",
      "steamLogin",
      "country",
      "guildName",
      "subscribe"
    ];
    const opts = { fields };

    try {
      const csv = json2csv.parse(resJSON, opts);
      return csv;
    } catch (err) {
      console.error(err);
      return "";
    }
  }

  async getUsersFromIdsInCSV(members) {
    const participants = await Promise.all(
      members.map(uid => this.getUserById(uid))
    );

    const resJSON = participants.map((data, i) => ({ idx: i + 1, ...data }));

    const fields = [
      "idx",
      "email",
      "login",
      "steamLogin",
      "country",
      "guildName",
      "subscribe"
    ];
    const opts = { fields };

    try {
      const csv = json2csv.parse(resJSON, opts);
      return csv;
    } catch (err) {
      console.error(err);
      return "";
    }

    return members;
  }

  async setGuildToUser(guildName, guildID, userId) {
    const user = await this.getUserById(userId);

    try {
      return await userRef.update({
        [user.uid]: {
          ...user,
          guildName,
          guildID
        }
      });
    } catch (err) {
      console.log("ERROR DB UPDATE USER FOR", user.uid);
      console.log(err);
    }
  }

  async setPromocodeToUser(promocode, userId, avaliablePromocodes) {
    const user = await this.getUserById(userId);

    if (Number(user.tries || 0) > 3) {
      return { success: false, triesLeft: 0 };
    }

    if (avaliablePromocodes.indexOf(promocode) > -1) {
      try {
        const newTries = !!user.tries ? user.tries + 1 : 1;
        await userRef.update({
          [user.uid]: {
            ...user,
            promocode,
            tries: newTries
          }
        });

        return { success: true, triesLeft: 3 - newTries };
      } catch (err) {
        console.log("ERROR DB UPDATE correct setPromocodeToUser", user.uid);
        console.log(err);
      }
    }

    try {
      const newTries = !!user.tries ? user.tries + 1 : 1;
      await userRef.update({
        [user.uid]: {
          ...user,
          tries: newTries
        }
      });
      return { success: false, triesLeft: 3 - newTries };
    } catch (err) {
      console.log("ERROR DB UPDATE incorrect setPromocodeToUser", user.uid);
      console.log(err);
    }
  }
}

module.exports = UserService;
