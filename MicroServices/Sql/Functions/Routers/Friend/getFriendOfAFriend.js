const userDb = require('@services/DbService');

async function getFriendOfAFriend(req, res) {
    const {groupId, friendId} = req.query;
    const p = userDb.GetPrismaClient();
    const GroupId = parseInt(groupId);
    const FriendId = parseInt(friendId);
    const friendOfTheFriend = await p.groupToUser.findMany({ where: { GroupId: GroupId, NOT: { UserId: FriendId } }, });
    res.send(friendOfTheFriend);
}

module.exports = getFriendOfAFriend;