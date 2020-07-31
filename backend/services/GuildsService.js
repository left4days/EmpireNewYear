const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.database();
const guildsRef = db.ref("server/saving-data/fireblog/guilds");
const { uuid } = require("uuidv4");

function sortByLevel(a, b) {
  const { level: aLevel } = a;
  const { level: bLevel } = b;
  if (aLevel > bLevel) {
    return -1;
  }

  if (aLevel < bLevel) {
    return 1;
  }

  return 0;
}

class GuildsService {
  async getGuilds() {
    let guilds = {};

    try {
      await guildsRef.once("value", snap => {
        guilds = snap.val() || {};
      });
    } catch (error) {
      console.log("ERROR IN GUILDS API");
      console.log(error);
      return { success: false, errorMessage: "ERROR IN GUILDS API" };
    }

    return Object.entries(guilds).map(([uid, guild]) => ({ ...guild, uid }));
  }

  async getGuildByName(guildName = "") {
    let guilds = [];

    try {
      guilds = await this.getGuilds();
    } catch (error) {
      console.log("ERROR IN GUILDS API");
      console.log(error);
      return { success: false, errorMessage: "ERROR IN GUILDS API" };
    }

    const guild = guilds.filter((guild) => guildName === guild.name)[0] || {};

    return guild;
  }

  async getTopGuilds(limit = 5) {
    let guilds = {};

    try {
      await guildsRef.once("value", snapshot => {
        guilds = Object.entries(snapshot.val())
          .map(([uid, guild]) => {
            return { uid, guild };
          })
          .sort(sortByLevel)
          .slice(0, +limit);

        return guilds;
      });
    } catch (error) {
      console.log("ERROR IN GUILDS API");
      console.log(error);
      return { success: false, errorMessage: "ERROR IN TOP GUILDS API" };
    }

    return guilds;
  }

  async getUsersFromGuild(guildName) {
    let members = [];
    let guild = {};

    try {
      guild = await this.getGuildByName(guildName);
      members = guild.members;
    } catch (error) {
      console.log("ERROR IN GUILDS API");
      console.log(error);
      return { success: false, errorMessage: "ERROR IN GUILDS API" };
    }

    return members;
  }

  async setGuildLevelByName(guildName, level) {
    const guild = await this.getGuildByName(guildName);

    try {
      return await guildsRef.child(guild.uid).update({ level });
    } catch (error) {
      console.log("ERROR IN setGuildLevelByName API");
      console.log(error);
      return {
        success: false,
        errorMessage: "ERROR IN setGuildLevelByName API"
      };
    }

    return { success: true };
  }

  async createGuild(guildName) {
    const uid = uuid();
    const result = {
        uid,
        name: guildName,
        level: 0,
        members: ['']
    };

    try {
      await guildsRef.update({
        [uid]: {
          name: guildName,
          level: 0,
          members: { 0: '' }
        }
      });
    } catch (err) {
      console.log("ERROR DB CREATE GUILD", uid);
      console.log(err);
      return { success: false };
    }

    return result;
  }

  async addUserToGuildById(guildId, userId) {
      let guild = {};
    try {
      await guildsRef.child(guildId).once('value', snap => {
          guild = snap.val() || { members: [] }
      });

      return await guildsRef
        .child(guildId)
        .update({ members: guild.members.concat([userId]) });
    } catch (err) {
      console.log(`ERROR DB ADD TO GUILD ${guildId}, USER: ${userId}`);
      console.log(err);
      return { success: false };
    }
  }
}

module.exports = GuildsService;
