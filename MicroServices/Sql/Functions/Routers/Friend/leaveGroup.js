const userDb = require('@services/DbService');

async function leaveGroup(req, res) {
    const { userEmail } = req.body;
    let userInDB = await userDb.FindFirst("user", "Email", userEmail);

    const groupId = req.body.group;
    const p = userDb.GetPrismaClient();
    const a = await p.groupToUser.findFirst({
        where: {
            GroupId: groupId,
            UserId: userInDB.Id
        }
    });
    await userDb.DeleteElement("groupToUser", "Id", a.Id);

    // check if the group is empty, then remove it
    const groupMembers = await userDb.FindAll('groupToUser', 'GroupId', groupId);
    if(groupMembers.length == 0) await userDb.DeleteElement("group", "Id", groupId);
    res.send('deleted');
}

module.exports = leaveGroup;