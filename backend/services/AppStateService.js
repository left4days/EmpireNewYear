const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.database();
const appStateRef = db.ref("appState");

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
    let winner = "";

    await appStateRef.on("value", snap => {
      const {
        actionState,
        winnerEmail,
      } = snap.val() || {};

      if (typeof actionState === "string") {
        state = actionState;
        winner = winnerEmail;
      }
    });

    // if (isAdmin) {
    //   await storiesRef.on("value", snap => {
    //     stories = Object.values(snap.val() || {});
    //     topStories = Object.values(stories).filter(i => i.shownOnMainPage);
    //
    //     storiesNum = Object.keys(stories).length;
    //     storiesTopNum = topStories.length;
    //   });
    // }

    return {
      state,
      winnerEmail: winner,
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
