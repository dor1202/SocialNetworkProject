const userDb = require('@services/DbService');

async function addTaggedUser(req, res) {
    const {UserId, PostId} = req.body;
    await userDb.AddDataToDb("tagedUser", {
        UserId: UserId,
        PostId: PostId
    });
    res.send('added');
}

module.exports = addTaggedUser;