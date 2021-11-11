const userDb = require('@services/DbService');

async function getLikes(req, res) {
    const {id} = req.query;
    let comments = await userDb.FindAll("likes", "PostId", id);
    res.send(comments.length.toString());
}

module.exports = getLikes;