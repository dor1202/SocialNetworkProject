const userDb = require('@services/DbService');

async function getTaggedUsers(req, res) {
    const {id} = req.query;
    let taggedUsers = await userDb.FindAll("tagedUser", "PostId", id);
    let jsonArr = [];
    for (let index = 0; index < taggedUsers.length; index++) {
        const user = await userDb.FindFirst('user', 'Id', taggedUsers[index].UserId);
        jsonArr.push({ id: user.Id, userName: user.UserName, avatar: user.Avatar });
    }
    res.send(jsonArr);
}

module.exports = getTaggedUsers;