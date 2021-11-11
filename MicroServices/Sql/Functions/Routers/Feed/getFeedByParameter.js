const userDb = require('@services/DbService');
const filters = require('./FeedFilters');

async function getFeedByParameter(req, res) {
    const { filterData, center } = req.body;
    const p = userDb.GetPrismaClient();
    const users = await p.post.findMany({
        include: {
            User: true,
            TaggedUsers: { include: { User: true } },
            TagsToPost: { include: { Tags: true } },
        },
    });
    let resArray = [];
    if (filterData.Publisher !== '') {
        resArray.push(filters.filterByPublisher(users, filterData.Publisher));
    }
    if (filterData.ImgTags !== '') {
        resArray.push(filters.filterByImageTags(users, filterData.ImgTags));
    }
    if (filterData.TaggedUsers !== '') {
        resArray.push(filters.filterByTaggedUsers(users, filterData.TaggedUsers));
    }
    if (filterData.useDate) {
        resArray.push(filters.filterByDate(users, filterData.ToDate, filterData.FromDate));
    }
    if (filterData.Radius != '') {
        resArray.push(filters.filterByRadius(users, filterData.Radius, center));
    }
    // sum all results
    const feed = filters.combineData(resArray);
    res.send(feed);
}

module.exports = getFeedByParameter;