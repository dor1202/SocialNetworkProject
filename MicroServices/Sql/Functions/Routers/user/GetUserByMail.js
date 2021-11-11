const userDb = require('@services/DbService');

async function GetUserByMail(req, res) {
    const {userMail} = req.query;
    let userInDB = await userDb.FindFirst("user", "Email", userMail);
    res.send(userInDB);
}

module.exports = GetUserByMail;