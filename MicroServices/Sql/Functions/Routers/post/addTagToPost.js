const userDb = require('@services/DbService');

async function addTagToPost(req, res) {
    const {PostId, TagsId} = req.body;
    userDb.AddDataToDb('tagToPost', { PostId: PostId, TagsId: TagsId })
    res.send('added');
}

module.exports = addTagToPost;