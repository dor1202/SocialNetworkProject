const userDb = require('@services/DbService');

async function removeFriend(req, res) {
    const { userEmail } = req.body;
    let userInDB = await userDb.FindFirst("user", "Email", userEmail);
    const friendId = req.body.friend;
    const p = userDb.GetPrismaClient();
    const a = await p.friend.findFirst({
        where: {
            FriendId: friendId,
            UserId: userInDB.Id
        }
    });
    await userDb.DeleteElement("friend", "Id", a.Id);
    res.send('deleted');
}

module.exports = removeFriend;