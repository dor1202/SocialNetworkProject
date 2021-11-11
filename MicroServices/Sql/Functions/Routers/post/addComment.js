
const userDb = require('@services/DbService');

async function addComment(req, res) {
    const {userEmail, id, comment} = req.body;
    const userInDB = await userDb.FindFirst("user", "Email", userEmail);
    const c = await userDb.AddDataToDb("comment", {
        PostId: id,
        UserId: userInDB.Id,
        Text: comment
    });
    const re = { Author: userInDB.UserName, Metadata: c.TimeStamp, Text: c.Text, avatar: userInDB.Avatar };
    res.send(re);
}

module.exports = addComment;