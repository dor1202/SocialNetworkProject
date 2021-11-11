const ElasticService = require('@Services/ElasticService');
const client = ElasticService.client;
const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');

async function getFeed(req, res) {
    const { center, userId } = req.body;

    const result = await client.search({
        index: 'post',
        body: {
            query: {
                bool: {
                    must: [
                        {
                            range: {
                                LocationLat: {
                                    gte: center[0] - 1,
                                    lte: center[0] + 1,
                                }
                            }
                        }
                        ,
                        {
                            range: {
                                LocationLan: {
                                    gte: center[1] - 1,
                                    lte: center[1] + 1,
                                }
                            }
                        }
                    ]
                }
            }
        }
    });

    const feed = result.body.hits.hits;

    const [unBlockedFriends, error] = await AwaitHandling(axios.SqlRequest.get('Friends/GetUnBlockedFriends', {params: {UserId: userId}}));
    if(!error){
        // filter data
        const [existGroupsUser, error1] = await AwaitHandling(axios.SqlRequest.get('Friends/GetGroupToUser', {params: {UserId: userId}}));
        if(!error1){
            const filteredFeed = await feed.filter(async (x) => {
                for (let a = 0; a < unBlockedFriends.data.length; a++) {
                    const friendId = unBlockedFriends.data[a].FriendId;
                    if (x._source.UserId == friendId) return true;
                    const [existGroupsFriend, error2] = await AwaitHandling(axios.SqlRequest.get('Friends/GetGroupToUser', {params: {UserId: friendId}}));
                    if(!error2){
                        // find the groups without the user
                        const groupsWithoutTheUser = existGroupsFriend.data.filter(o1 => !existGroupsUser.data.some(o2 => o1.GroupId === o2.GroupId));
                        for (let b = 0; b < groupsWithoutTheUser.length; b++) {
                            // find friend of friend
                            const groupId = groupsWithoutTheUser[b].GroupId;
                            const [friendOfTheFriend, error4] = await AwaitHandling(axios.SqlRequest.get('Friends/GetFriendOfAFriend', { params: { groupId: groupId, friendId: friendId } }));
                            if(!error4){
                                for (let c = 0; c < friendOfTheFriend.data.length; c++) {
                                    // save friend post and friend of friend post
                                    const userId = friendOfTheFriend.data[c].UserId;
                                    if (x._source.UserId == userId) return true;
                                }
                            }
                        }
                    }
                }
                return false;
            });
            if (filteredFeed.length >= 100) {
                // sort the first 100 top likes.
                filteredFeed.sort(function (a, b) { return (b.Likes > a.Likes) ? 1 : ((b.Likes < a.Likes) ? -1 : 0); });
                const result = filteredFeed.slice(0, 100);
                res.send(result);
            }
            else {
                res.send(filteredFeed);
            }
        }
    }
}

module.exports = getFeed;