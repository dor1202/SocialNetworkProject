const userDb = require('@services/DbService');

async function getUser(req, res) {
    const {userId} = req.query;
    let userInDB = await userDb.FindFirst("user", "Id", parseInt(userId));
    res.send(userInDB);
}

module.exports = getUser;