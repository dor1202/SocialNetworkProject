const userDb = require('@services/DbService');

async function getUnBlockedFriends(req, res) {
    const {UserId} = req.query;
    const p = userDb.GetPrismaClient();
    const userId = parseInt(UserId);
    const unBlockedFriends = await p.friend.findMany({ where: { IsBlocked: false, UserId: userId } });
    res.send(unBlockedFriends);
}

module.exports = getUnBlockedFriends;