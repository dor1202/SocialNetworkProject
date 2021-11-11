const userDb = require('@services/DbService');
const bcrypt = require('bcrypt');

async function resetPassword(req, res) {
    const { email, password } = req.body;
    let user = await userDb.FindFirst("user", "Email", email);
    if(user !== null) {
        const hash = await bcrypt.hash(password, 10);
        userDb.UpdateData("user", "Id", user.Id, {Password: hash})
        res.send('ok');
    }
    else res.send('user not found');
}


module.exports = resetPassword;