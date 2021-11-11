const userDb = require('../../../Services/DbService');
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
const bcrypt = require('bcrypt');
const generateToken = require('@services/JwtService').GetToken;

async function signup(req, res) {
    const { UserName, Password, Email, FirstName, LastName, PhoneNumber, bday, Address, Platform } = req.body.user;
    bcrypt.hash(Password, 10).then((hash) => {
        $.get(`https://avatars.dicebear.com/api/initials/${UserName}.svg`, async (svgData, status) => {
            const currentUserData = {
                UserName: UserName,
                Password: hash,
                Email: Email,
                FirstName: FirstName,
                LastName: LastName,
                Avatar: svgData,
                PhoneNumber: PhoneNumber,
                BirthDay: bday,
                Address: Address,
                Platform: Platform
            };
            let userInDB = await userDb.AddDataToDb("user", currentUserData);
            let token = generateToken(userInDB, `${userInDB.Id}`);
            res.send({
                Status: true,
                Token: token,
                Avatar: userInDB.Avatar
            });
        }, "text")
    });
}

module.exports = signup;
