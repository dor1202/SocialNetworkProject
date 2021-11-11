const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');
const Status = require('@Services/ServerStatus');
const SocketService = require('@Sockets/SocketService');

async function createPost(req, res) {
    const [result, error] = await AwaitHandling(axios.ElasticRequest.post('Post/CreatePost', { post: req.body.post }));
    if (!error) {
        const [PostTable, error1] = await AwaitHandling(axios.SqlRequest.post('Posts/CreateByElastic', {postElementIsPublic: result.data.postElementIsPublic, postElementUserId: result.data.postElementUserId ,elementId: result.data.element.body._id}));
        if (!error1) {
            const socketService = new SocketService(null);
            // notify the friends
            const [unBlockedFriends, error2] = await AwaitHandling(axios.SqlRequest.get('Friends/GetUnBlockedFriends', { params: { UserId: req.body.post.UserId } }));
            if (!error2) {
                const [existGroupsUser, error3] = await AwaitHandling(axios.SqlRequest.get('Friends/GetGroupToUser', { params: { UserId: req.body.post.UserId } }));
                if (!error3) {
                    for (let a = 0; a < unBlockedFriends.data.length; a++) {
                        const friendId = unBlockedFriends.data[a].FriendId;
                        const socketId = socketService.socketDictionary[friendId];
                        if (socketId != undefined) socketService.io.to(socketId).emit('receiveFeedUpdateAvailable');

                        const [existGroupsFriend, error4] = await AwaitHandling(axios.SqlRequest.get('Friends/GetGroupToUser', { params: { UserId: friendId } }));
                        if (!error4) {
                            // find the groups without the user
                            const groupsWithoutTheUser = existGroupsFriend.data.filter(o1 => !existGroupsUser.data.some(o2 => o1.GroupId === o2.GroupId));
                            for (let b = 0; b < groupsWithoutTheUser.length; b++) {
                                // find friend of friend
                                const groupId = groupsWithoutTheUser[b].GroupId;
                                const [friendOfTheFriend, error5] = await AwaitHandling(axios.SqlRequest.get('Friends/GetFriendOfAFriend', { params: { groupId: groupId, friendId: friendId } }));
                                if (!error5) {
                                    for (let c = 0; c < friendOfTheFriend.data.length; c++) {
                                        // save friend post and friend of friend post
                                        const userId = friendOfTheFriend.data[c].UserId;
                                        const socketId = socketService.socketDictionary[userId];
                                        if (socketId != undefined) socketService.io.to(socketId).emit('receiveFeedUpdateAvailable');
                                    }
                                }
                            }
                        }
                    }
                    res.status(Status.OK.status).json(result.data);
                }
            }
        }
    }
    else res.status(Status.BAD.status).json(Status.BAD.message);
}

module.exports = createPost;