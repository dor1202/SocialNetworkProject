const userDb = require('@services/DbService');

async function addFriendToGroup(req, res) {
    const { group, user } = req.body;
    const p = userDb.GetPrismaClient();
    const a = await p.groupToUser.findFirst({
        where: {
            GroupId: group.id,
            UserId: user.id
        }
    });
    let alreadyExist = true;
    if(a == null){
        await userDb.AddDataToDb("groupToUser", { GroupId: group.id, UserId: user.id });
        alreadyExist = false;
    }
    const expData = {
        groupName: group.groupName,
        id: group.id,
        newFriend: { userName: user.userName, id: user.id, image: user.image },
        alreadyExist
    };
    res.send(expData);
}

module.exports = addFriendToGroup;