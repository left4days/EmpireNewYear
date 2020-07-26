const firebaseAdmin = require('firebase-admin');
const get = require('lodash/get');
const mergeDeep = require('lodash/merge');
const json2csv = require('json2csv');
const db = firebaseAdmin.database();
const userRef = db.ref('server/saving-data/fireblog/users');
const appStateRef = db.ref('server/saving-data/fireblog/appState');

const GuildService = require('../services/ClickService');

const guildService = new GuildService();

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max - min);
    rand = Math.round(rand);

    return rand;
};

function getUniqIndexes({ from, to, limit }) {
    if (to < from || isNaN(parseInt(from)) || isNaN(parseInt(to)) || isNaN(parseInt(limit))) {
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

        await userRef.child(uid).once('value', snap => {
            result = snap.val();
        });

        // const { name: guildName = '' } = await guildService.getById(uid);

        return {
            ...result,
            // guildName,
            uid,
        };
    }

    async registerNewUser(data) {
        const { uid, login, steamLink, email } = data;

        try {
            return await userRef.update({
                [uid]: {
                    role: 'user',
                    steamLink,
                    email,
                    login,
                },
            });
        } catch (err) {
            console.log('ERROR DB UPDATE USER FOR', uid);
            console.log(err);
        }
    }

    async generatelocaleWinners(params) {
        const { limit = 10 } = params;

        let participants = [];
        let winners = [];
        try {
            await userRef.once('value', snapshot => {
                participants = Object.entries(snapshot.val()).map(([uid]) => {
                    return uid;
                });
                // .filter(({ data }) => data.clicks > 10);
            });
        } catch (err) {
            console.log('ERROR DB GET TOP CLICKERS');
            console.log(err);

            return participants;
        }

        const participantsNumber = participants.length - 1;
        const winnersIndexes = getUniqIndexes({ from: 0, to: participantsNumber, limit });

        for (let idx of winnersIndexes) {
            winners.push(participants[idx]);
        }

        try {
            await appStateRef.update({
                localWinners: winners,
            });
        } catch (err) {
            console.log('ERROR DB UPDATE WINNERS LIST', winners);
            console.log(err);
        }

        return await Promise.all(winners.map(uid => this.getUserById(uid)));
    }

    async getWinners(params) {
        const { limit = 10 } = params;
        let winnerList = [];

        try {
            await appStateRef.once('value', snapshot => {
                winnerList = get(snapshot.val(), 'localWinners', []);
            });
        } catch (err) {
            console.log('ERROR DB GET WINNERS');
            console.log(err);

            return [];
        }

        return await Promise.all(winnerList.map(uid => this.getUserById(uid)));
    }

    async getAllUsersInCSV(params) {
        const { limit } = params;

        let participants = {};

        try {
            await userRef.once('value', snapshot => {
                participants = snapshot.val() || {};
            });
        } catch (err) {
            console.log('ERROR DB GET TOP CLICKERS');
            console.log(err);

            return participants;
        }

        // const clicks = (await clickService.getAllUsersClicks()) || {};

        for (const uid in participants) {
            if (participants[uid]) {
                participants[uid] = { ...participants[uid], guildName: '' };
            }
        }

        const resJSON = Object.entries(participants).map(([uid, data], i) => ({ idx: i + 1, uid, ...data }));

        const fields = ['idx', 'email', 'login', 'steamLink', 'uid', 'clicks'];
        const opts = { fields };

        try {
            const csv = json2csv.parse(resJSON, opts);
            return csv;
        } catch (err) {
            console.error(err);
            return '';
        }
    }

    // async customRegisterNewUser(reqBody) {
    //     const { user_id } = reqBody;
    //     return firebaseAdmin
    //         .auth()
    //         .createCustomToken(user_id)
    //         .then(function(customToken) {
    //             return customToken;
    //         })
    //         .catch(function(error) {
    //             console.log('Error creating custom token:', error);
    //         });
    // }
}

module.exports = UserService;
