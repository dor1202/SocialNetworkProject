const userDb = require('@services/DbService');

async function getGroups(req, res) {
    const {userEmail} = req.query;
    let userInDB = await userDb.FindFirst("user", "Email", userEmail);
    const existGroups = await userDb.FindAll("groupToUser", "UserId", userInDB.Id);
    let tmpArr = [];
    for (let i = 0; i < existGroups.length; i++) {
        const currentGroup = await userDb.FindFirst("group","Id", existGroups[i].GroupId);
        tmpArr.push({ groupName: currentGroup.GroupName, id: currentGroup.Id, friends: [] });
        const usersInGroup = await userDb.FindAll("groupToUser","GroupId", currentGroup.Id);
        for (let j = 0; j < usersInGroup.length; j++) {
            if (usersInGroup[j].UserId != userInDB.Id) {
                const user = await userDb.FindFirst("user","Id", usersInGroup[j].UserId);
                tmpArr[i].friends.push({ userName: user.UserName, id: user.id, image: user.Avatar });
            }
        }
    }
    res.send(tmpArr);
}

module.exports = getGroups;