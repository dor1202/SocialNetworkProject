const userDb = require('@services/DbService');

async function addTags(req, res) {
    const {Text} = req.body;
    dbElement = await userDb.AddDataToDb('tags', {
        Text: Text
    });
    res.send(dbElement);
}

module.exports = addTags;