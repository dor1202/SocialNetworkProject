const userDb = require('@services/DbService');

async function GetFriendsByEmail(req, res) {
    const {userEmail} = req.query;
    const query = req.query.user;
    const userInDB = await userDb.FindFirst("user", "Email", userEmail);
    const friends = await userDb.FindAll("friend","UserId", userInDB.Id);
    let tmpArr = [];
    for (let index = 0; index < friends.length; index++) {
        const user = await userDb.FindFirst("user","Id", friends[index].FriendId);
        tmpArr.push({ email: user.Email ,userName: user.UserName, id: user.Id, image: user.Avatar, isBlocked: friends[index].IsBlocked });
    }
    res.send(tmpArr);
}

module.exports = GetFriendsByEmail;