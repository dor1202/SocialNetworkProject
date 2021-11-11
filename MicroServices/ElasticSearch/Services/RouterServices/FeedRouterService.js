
const GetFeedFunc = require('@Functions/FeedRouter/GetFeed');

class PostRouterService {
    static GetFeed = (req,res) => GetFeedFunc(req,res);
}

module.exports = PostRouterService;