const { requiresAdmin } = require("./middleware");
const StoriesService = require("../services/StoriesService");

const storiesService = new StoriesService();

async function getStories(req, res, next) {
  const result = await storiesService.getStories();

  res.json({ success: true, data: result });

  return result;
}

async function getTopStories(req, res, next) {
  const { params = {} } = req;

  const result = await storiesService.getTopStories();

  res.json({ success: true, data: result });

  return result;
}

async function getStory(req, res, next) {
  const { params = {} } = req;
  const { email = "" } = params;
  const result = await storiesService.getStoryByEmail(email);

  res.json({ success: true, data: result });

  return result;
}

async function createStory(req, res, next) {
  const { body = {} } = req;

  const result = await storiesService.createStory(body);

  res.json({ success: true });
}

async function switchShowStoryOnMainPage(req, res, next) {
  const { body = {} } = req;

  const result = await storiesService.switchStory();

  res.json({ success: true });
}

module.exports = {
  GET: [
    ["/api/v1/stories", requiresAdmin, getStories],
    ["/api/v1/top-stories", getTopStories],
    ["/api/v1/story/:email", requiresAdmin, getStory]
  ],
  POST: [["/api/v1/story", createStory]],
  PUT: [[
    ["/api/v1/story", switchShowStoryOnMainPage]
  ]]
};
