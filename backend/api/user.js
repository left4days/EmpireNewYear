const UserService = require("../services/UserService");
const AppStateService = require("../services/AppStateService");
const { requiresAdmin } = require("./middleware");

const userService = new UserService();
const appStateService = new AppStateService();

async function checkIsUserExist(req, res, next) {
  res.json({
    success: false,
    errorMessage: "This login already exist",
    meta: { login: false }
  });
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
  const [users, created] = await userService.getWinners(req.params);

  res.json({ success: true, data: users, created });
}

async function getSecretWinners(req, res) {
    const { secretWinners = [] } = await appStateService.getAppState(true);

    if(!secretWinners.length) {
        return res.json({ success: false, data: [], error: 'Секретный победитель не определён' })
    }
    const users = await Promise.all(secretWinners.map(uid => userService.getUserById(uid)));

    res.json({ success: true, data: users });
}

async function generateSecretWinners(req, res) {
    const [users, created] = await userService.generateSecretWinners(req.params);

    res.json({ success: true, data: users, created });
}

async function generateWinners(req, res) {
  const [users, created] = await userService.generateLocaleWinners(req.params);

  res.json({ success: true, data: users, created });
}

async function setPromocodeToUser(req, res, next) {
    const { body = {} } = req;
    const { promocode = "", userId } = body;

    const { promocodes = [] } = await appStateService.getAppState(true);

    const { success, triesLeft } = await userService.setPromocodeToUser(promocode, userId, promocodes);

    res.json({ success, triesLeft });
}

async function getAllUsers(req, res) {
  const users_csv = await userService.getAllUsersInCSV(req.params);

  res.setHeader("Content-Disposition", "attachment; filename=data.csv");
  res.setHeader("content-type", "text/csv");
  res.status(200).send(new Buffer(users_csv));
}

module.exports = {
  GET: [
    ["/api/v1/user/:userId", getUserData],
    ["/api/v1/users", requiresAdmin, getAllUsers],
    ["/api/v1/user/winners/:limit", requiresAdmin, getWinners],
    ["/api/v1/user/winners-create/:limit", requiresAdmin, generateWinners],
    ["/api/v1/user/secret-winners/:limit", requiresAdmin, getSecretWinners]
  ],
  POST: [
    ["/api/v1/user", registerUser],
    ["/api/v1/user/secret-winners/:limit", requiresAdmin, generateSecretWinners],
  ],
  PUT: [
      ["/api/v1/user/add-promocode", setPromocodeToUser]
  ]
};
