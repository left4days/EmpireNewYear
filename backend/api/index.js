const express = require('express');
const router = express.Router();

const storiesApi = require('./stories');
const userApi = require('./user');
const appStateApi = require('./appState');

function createRoutes(route) {
    const { GET = [], POST = [], PUT = [], DELETE = [] } = route;

    GET.forEach(function(route) {
        const [url, ...callbacks] = route;
        router.get(url, ...[callbacks]);
    });

    POST.forEach(function(route) {
        const [url, ...callbacks] = route;
        router.post(url, ...[callbacks]);
    });

    PUT.forEach(function(route) {
        const [url, ...callbacks] = route;
        router.put(url, ...[callbacks]);
    });
}

function applyRoutes(app) {
    createRoutes(userApi, router);
    createRoutes(appStateApi, router);
    createRoutes(storiesApi, router);

    router.get('/api/*', (req, res, next) => {
        res.json({ success: true, message: 'This api url is not declared' });
    });

    app.use(router);
}

module.exports = { applyRoutes };
