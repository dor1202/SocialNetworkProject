const userDb = require('@services/DbService');

async function addLike(req, res) {
    const {userEmail, id} = req.query;
    const prisma = userDb.GetPrismaClient();
    let userInDB = await userDb.FindFirst("user", "Email", userEmail);
    let likesCount = await userDb.FindAll("likes", "PostId", id);
    for (let index = 0; index < likesCount.length; index++) {
        if (likesCount[index].UserId == userInDB.Id) {
            // unlike
            const a = await prisma.likes.findFirst({
                where: {
                    UserId: userInDB.Id,
                    PostId: id,
                }
            });
            await userDb.DeleteElement("likes", "Id", a.Id);
            res.send({likes:(likesCount.length - 1).toString(), isLike: false});
            return;
        }
    }
    // like
    await userDb.AddDataToDb("likes", {
        UserId: userInDB.Id,
        PostId: id,
    })
    res.send({likes:(likesCount.length + 1).toString(), isLike: true});
}

module.exports = addLike;