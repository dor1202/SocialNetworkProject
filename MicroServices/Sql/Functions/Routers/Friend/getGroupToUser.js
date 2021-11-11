const userDb = require('@services/DbService');

async function getGroupToUser(req, res) {
    const {UserId} = req.query;
    const userId = parseInt(UserId);
    const existGroupsUser = await userDb.FindAll("groupToUser", "UserId", userId);
    res.send(existGroupsUser);
}

module.exports = getGroupToUser;