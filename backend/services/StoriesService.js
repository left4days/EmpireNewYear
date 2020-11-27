const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.database();
const storiesRef = db.ref("stories");
const appStateRef = db.ref("appState");
const { uuid } = require("uuidv4");

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max - min);
  rand = Math.round(rand);

  return rand;
};

function sortByDate(a, b) {
  const {created: aCreated} = a;
  const {created: bCreated} = b;
  if (Number(aCreated) > Number(bCreated)) {
    return -1;
  }

  if (Number(aCreated) < Number(bCreated)) {
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

    return Object.values(stories).sort(sortByDate);
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

    return stories.filter(i => i.shownOnMainPage).sort(sortByDate);
  }

  async getStoryByEmail(email) {
    let stories = {};
    try {
      await storiesRef.once("value", snap => {
        stories = snap.val() || {};
      });
    } catch (error) {
      console.log("ERROR IN getStoryByEmail API");
      console.log(error);
      return {
        success: false,
        errorMessage: "ERROR IN getStoryByEmail API"
      };
    }

    const [uid, story] = Object.entries(stories).find(([uid, story]) => story.email === email) || ['', {}];

    return { uid, ...story };
  }

  async createStory(data) {
    const { text, name, email, link } = data;
    const uid = uuid();
    const result = {
      text,
      name,
      email,
      link,
      created: Date.now(),
      shownOnMainPage: false
    };

    try {
      await storiesRef.update({
        [uid]: result
      });
    } catch (err) {
      console.log("ERROR DB createStory", email);
      console.log(err);
      return { success: false };
    }

    return result;
  }

  async generateWinner() {
    let stories = {};
    try {
      await storiesRef.once("value", snap => {
        stories = snap.val() || {};
      });
    } catch (error) {
      console.log("ERROR IN getStoryByEmail API");
      console.log(error);
      return {
        success: false,
        errorMessage: "ERROR IN getStoryByEmail API"
      };
    }

    const emails = Object.values(stories).map(story => story.email);
    const email = emails[randomInteger(0, emails.length)];

    try {
      await appStateRef.update({ winnerEmail: email });
    } catch (error) {
      console.log("ERROR IN generateWinner API");
      console.log(error);
      return {
        success: false,
        errorMessage: "ERROR IN generateWinner API"
      };
    }

    return email;
  }

  async switchStory(email) {
    let story = {};
    try {
      story = await this.getStoryByEmail(email);

      await storiesRef
        .child(story.uid)
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
