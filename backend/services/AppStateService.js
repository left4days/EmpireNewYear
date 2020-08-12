const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.database();
const appStateRef = db.ref("server/saving-data/fireblog/appState");
const usersRef = db.ref("server/saving-data/fireblog/users");
const guildsRef = db.ref("server/saving-data/fireblog/guilds");

function stateFSM(currentState) {
  switch (currentState) {
    case "DEV":
      return "ACTIVE";
    case "ACTIVE":
      return "FINISHED";
    case "FINISHED":
      return "DEV";
    default:
      return currentState;
  }
}

class AppStateService {
  constructor() {
    this.lastVerifyDevTS = null;
  }

  async getAppState(isAdmin) {
    let state = "ACTIVE";
    let guild_leaders = [];
    let local_Winners = [];
    let secret_winners = [];
    let usersNum = 0;
    let guildsNum = 0;

    await appStateRef.on("value", snap => {
      const { actionState, guildLeaders, localWinners, secretWinners } = snap.val() || {};

      if (typeof actionState === "string") {
        state = actionState;
        guild_leaders = guildLeaders;
        local_Winners = localWinners;
        secret_winners = secretWinners;
      }
    });

    if (isAdmin) {
      await usersRef.on("value", snap => {
        const users = snap.val() || {};

        usersNum = Object.keys(users).length;
      });

      await guildsRef.on("value", snap => {
        const guilds = snap.val() || {};

          guildsNum = Object.keys(guilds).length;
      });
    }

    return {
      state,
      guildLeaders: guild_leaders,
      localWinners: local_Winners,
      secretWinners: secret_winners,
      usersNum,
      guildsNum,
    };
  }

  async checkDevAccess(password) {
    let isValid = false;

    await appStateRef.once("value", snap => {
      const { devPassword } = snap.val() || {};

      if (devPassword === password) {
        isValid = true;
        return;
      }
    });

    return isValid;
  }

  async switchAppState(currentState) {
    let newState = currentState;

    if (!currentState) {
      return { success: false, errorMessage: "invalid state" };
    }

    newState = stateFSM(currentState);

    try {
      await appStateRef.update({ actionState: newState });
    } catch (error) {
      console.log("ERROR IN CHANGE CURRENT APP STATE");
      console.log(error);
      return {
        success: false,
        errorMessage: "ERROR IN CHANGE CURRENT APP STATE"
      };
    }

    return newState;
  }
}

module.exports = AppStateService;
