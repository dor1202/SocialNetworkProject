const userDb = require('@services/DbService');

async function getTags(req, res) {
    const tags = await userDb.GetAllData("tags");
    res.send(tags);
}

module.exports = getTags;