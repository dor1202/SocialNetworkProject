const userDb = require('@services/DbService');

async function addFriend(req, res) {
    const { friend, user } = req.body;
    const p = userDb.GetPrismaClient();
    const f = await p.friend.findFirst({
        where: {
            FriendId: friend,
            UserId: user.Id
        }}
    );
    if(f === null) {
        const newFriend = await userDb.AddDataToDb("friend", { UserId: user.Id , FriendId: friend , IsBlocked : false});
        const userSearch = await userDb.FindFirst("user","Id", newFriend.FriendId);
        res.send({ userName: userSearch.UserName, id: userSearch.Id, image: userSearch.Avatar, isBlocked: newFriend.IsBlocked, alreadyExist: false });
    }
    else{
        res.send({alreadyExist: true});
    }
}

module.exports = addFriend;