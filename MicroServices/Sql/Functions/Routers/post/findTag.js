const userDb = require('@services/DbService');

async function findTag(req, res) {
    const {Text} = req.body;
    let dbElement = await userDb.FindFirst('tags', 'Text', Text)
    res.send(dbElement);
}

module.exports = findTag;