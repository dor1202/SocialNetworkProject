const userDb = require('@services/DbService');

async function connectPostToSql(req, res) {
    const { postElementIsPublic, postElementUserId, elementId } = req.body;
    const post = await userDb.AddDataToDb("postToElastic", {
        UserId: postElementUserId,
        PostId: elementId,
        IsPublic: postElementIsPublic
    })
    res.send(post);
}
module.exports = connectPostToSql;