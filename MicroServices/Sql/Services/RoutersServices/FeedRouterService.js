
const getFeedByParameter = require('@functions/Routers/Feed/getFeedByParameter');
const getFeed = require('@functions/Routers/Feed/getFeed');

class FeedRouterService {
    static getFeedByParameter = (req, res) => getFeedByParameter(req, res);
    static getFeed = (req, res) => getFeed(req, res);
}

module.exports = FeedRouterService;