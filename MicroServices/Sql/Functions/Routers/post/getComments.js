const userDb = require('@services/DbService');

async function getComments(req, res) {
    const {id} = req.query;
    let comments = await userDb.FindAll("comment", "PostId", id);
    let com = [];
    for (let index = 0; index < comments.length; index++) {
        const user = await userDb.FindFirst('user', 'Id', comments[index].UserId);
        com.push({ Author: user.UserName, Metadata: comments[index].TimeStamp, Text: comments[index].Text, avatar: user.Avatar });
    }
    res.send(com);
}

module.exports = getComments;