const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.database();
const appStateRef = db.ref('server/saving-data/fireblog/appState');
const usersRef = db.ref('server/saving-data/fireblog/users');

// const UserService = require('../services/UserService');
//
// const userService = new UserService();

function stateFSM(currentState) {
    switch (currentState) {
        case 'DEV':
            return 'ACTIVE';
        case 'ACTIVE':
            return 'FINISHED';
        case 'FINISHED':
            return 'DEV';
        default:
            return currentState;
    }
}

class AppStateService {
    constructor() {
        this.lastVerifyDevTS = null;
    }

    async getAppState() {
        let state = 'ACTIVE';
        let guild_leaders = [];
        let local_Winners = [];
        let usersNum = 0;

        await appStateRef.on('value', snap => {
            const { actionState, guildLeaders, localWinners } = snap.val() || {};

            if (typeof actionState === 'string') {
                state = actionState;
                guild_leaders = guildLeaders;
                local_Winners = localWinners;
            }
        });

        await usersRef.on('value', snap => {
            const users = snap.val() || {};

            usersNum = Object.keys(users).length;
        });

        return { state, guildLeaders: guild_leaders, localWinners: local_Winners, users: usersNum, guildsNumber: 3 };
    }

    async checkDevAccess(password) {
        let isValid = false;

        await appStateRef.once('value', snap => {
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
            return { success: false, errorMessage: 'invalid state' };
        }

        newState = stateFSM(currentState);

        try {
            await appStateRef.update({ actionState: newState });
        } catch (error) {
            console.log('ERROR IN CHANGE CURRENT APP STATE');
            console.log(error);
            return { success: false, errorMessage: 'ERROR IN CHANGE CURRENT APP STATE' };
        }

        return newState;
    }
}

module.exports = AppStateService;
