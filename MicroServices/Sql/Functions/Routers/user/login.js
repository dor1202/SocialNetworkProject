const userDb = require('@services/DbService');
const jwt = require('@services/JwtService');
const FillUserModel = require('../../FillModelClass');
const bcrypt = require('bcrypt');

async function login(req, res) {
    const { Email, Password } = req.body.user;
    let user = await userDb.FindFirst("user", "Email", Email);
    const match = await bcrypt.compare(Password, user.Password);
    if (match) {
        let userTemplate = FillUserModel.fillUserModel(user.Id, user.UserName, user.FirstName, user.LastName, user.Email);
        let jwtToken = jwt.GetToken({ 
            userTemplate
         }, user.Id.toString());
         return res.send({
            Status: match,
            Token: jwtToken,
            Avatar: user.Avatar
        });
    }
    else {
        return res.send({
            Status: match
        });
    }
}


module.exports = login;