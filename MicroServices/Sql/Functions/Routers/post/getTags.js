const userDb = require('@services/DbService');

async function getTags(req, res) {
    const {id} = req.body;
    const tagsToPostArray = await userDb.FindAll("tagToPost", "PostId", id);
    let finalTagArr = [];
    for (let index = 0; index < tagsToPostArray.length; index++) {
        let tag = await userDb.FindFirst("tags", "Id", tagsToPostArray[index].TagsId);
        finalTagArr.push(tag);
    }
    res.send(finalTagArr);
}

module.exports = getTags;