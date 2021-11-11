
const getFeedByParameter = require('@functions/Routers/Feed/getFeedByParameter');
const getFeed = require('@functions/Elastic/Feed/GetFeedFunc');

class FeedRouterService {
    static getFeedByParameter = (req, res) => getFeedByParameter(req, res);
    static getFeed = (req, res) => getFeed(req, res);
}

module.exports = FeedRouterService;