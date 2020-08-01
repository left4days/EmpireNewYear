const { requiresAdmin } = require('./middleware');
const GuildsService = require('../services/GuildsService');
const UserService = require('../services/UserService');

const guildsService = new GuildsService();
const userService = new UserService();

async function getGuilds(req, res, next) {
    const result = await guildsService.getGuilds();

    res.json({ success: true, data: result });
}

async function getTopGuilds(req, res, next) {
    const { params = {} } = req;
    const { limit = 10 } = params;

    const result = await guildsService.getTopGuilds(limit);

    res.json({ success: true, data: result });
}

async function getUsersFromGuild(req, res, next) {
    const { body = {} } = req;
    const { guildName = '' } = body;
    const usersUids = await guildsService.getUsersIdsFromGuild(guildName);
    const users = await Promise.all(usersUids.map(uid => userService.getUserById(uid)));

    res.json({ success: true, data: users });
}

async function setGuildLevelByName(req, res, next) {
    const { body = {} } = req;
    const { guildName = '', level = 0 } = body;
    const result = await guildsService.setGuildLevelByName(guildName, level);

    res.json({ success: true, data: result });
}

module.exports = {
    GET: [
        ['/api/v1/guilds', requiresAdmin, getGuilds],
        ['/api/v1/guilds/top/:limit', getTopGuilds],
        ['/api/v1/guilds/users', requiresAdmin, getUsersFromGuild],
    ],
    PUT: [
        ['/api/v1/guild/level', requiresAdmin, setGuildLevelByName],
    ],
};
