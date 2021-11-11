const userDb = require('@services/DbService');

async function createNewGroup(req, res) {
    const {userEmail} = req.body;
    let userInDB = await userDb.FindFirst("user", "Email", userEmail);
    const groupName = req.body.group;
    let groupData = await userDb.AddDataToDb("group", { GroupName: groupName });
    await userDb.AddDataToDb("groupToUser", { GroupId: groupData.Id, UserId: userInDB.Id });
    let arr = [];
    const expData = {
        groupName: groupData.GroupName,
        id: groupData.Id,
        friends: arr
    };
    res.send(expData);
}

module.exports = createNewGroup;