const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.database();
const storiesRef = db.ref("stories");
// const { uuid } = require("uuidv4");

function sortByLevel(a, b) {
  const { level: aLevel } = a;
  const { level: bLevel } = b;
  if (Number(aLevel) > Number(bLevel)) {
    return -1;
  }

  if (Number(aLevel) < Number(bLevel)) {
    return 1;
  }

  return 0;
}

class StoriesService {
  async getStories() {
    let stories = {};

    try {
      await storiesRef.once("value", snap => {
        stories = snap.val() || {};
      });
    } catch (error) {
      console.log("ERROR IN GUILDS API");
      console.log(error);
      return { success: false, errorMessage: "ERROR IN GUILDS API" };
    }

    return Object.values(stories);
  }

  async getTopStories() {
    let stories = [];

    try {
      stories = await this.getStories();
    } catch (error) {
      console.log("ERROR IN STORIES API");
      console.log(error);
      return { success: false, errorMessage: "ERROR IN STORIES API" };
    }

    return stories.filter(i => i => i.shownOnMainPage);
  }

  async getStoryByEmail(email) {
    let story = {};
    try {
      await storiesRef.child(email).once("value", snap => {
        story = snap.val() || {};
      });
    } catch (error) {
      console.log("ERROR IN getStoryByEmail API");
      console.log(error);
      return {
        success: false,
        errorMessage: "ERROR IN getStoryByEmail API"
      };
    }

    return story;
  }

  async createStory(data) {
    const { text, name, email } = data;
    // const uid = uuid();
    const result = {
      text,
      name,
      email,
      created: Date.now(),
      shownOnMainPage: false
    };

    try {
      await storiesRef.update({
        [email]: result
      });
    } catch (err) {
      console.log("ERROR DB createStory", email);
      console.log(err);
      return { success: false };
    }

    return result;
  }

  async switchStory(email) {
    let story = {};
    try {
      await storiesRef.child(email).once("value", snap => {
        story = snap.val() || {};
      });

      await storiesRef
        .child(email)
        .update({ shownOnMainPage: !story.shownOnMainPage });
      return { success: true };
    } catch (err) {
      console.log(`ERROR DB ADD TO GUILD ${email}`);
      console.log(err);
      return { success: false };
    }
  }
}

module.exports = StoriesService;
