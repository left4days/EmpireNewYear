const UserService = require('../services/UserService');
const GuildsService = require('../services/GuildsService');
const { requiresAdmin, requiresAuth } = require('./middleware');

const userService = new UserService();
const guildsService = new GuildsService();

async function checkIsUserExist(req, res, next) {
    res.json({ success: false, errorMessage: 'This login already exist', meta: { login: false } });
}

async function getUserData(req, res, next) {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);

    res.json(user);
}

async function registerUser(req, res) {
    const user = await userService.registerNewUser(req.body);

    res.json({ success: true });
}

async function getWinners(req, res) {
    const users = await userService.getWinners(req.params);

    res.json({ success: true, data: users });
}

async function generateWinners(req, res) {
    const users = await userService.generatelocaleWinners(req.params);

    res.json({ success: true, data: users });
}

async function setGuildToUser(req, res, next) {
    const { body = {} } = req;
    const { guildName = '', userId } = body;
    // const isValid = await appStateService.checkDevAccess(devPassword);
    const guild = await guildsService.getGuildByName(guildName);

    if(guild.name) {
        await userService.setGuildToUser(guildName, guild.uid, userId);
    } else {
        await guildsService.createGuild(guildName);
    }

    await guildsService.addUserToGuildById(guild.uid, userId);

    res.json({ success: true });
}

async function getAllUsers(req, res) {
    const users_csv = await userService.getAllUsersInCSV(req.params);

    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
    res.setHeader('content-type', 'text/csv');
    res.status(200).send(new Buffer(users_csv));
}

module.exports = {
    GET: [
        ['/api/v1/user/:userId', getUserData],
        ['/api/v1/users', requiresAdmin, getAllUsers],
        ['/api/v1/user/winners/:limit', requiresAdmin, getWinners],
        ['/api/v1/user/winners-create/:limit', requiresAdmin, generateWinners],
    ],
    POST: [
        ['/api/v1/user', registerUser],
    ],
    PUT: [
        ['/api/v1/user/:userId/add-guild', setGuildToUser],
    ],
};
