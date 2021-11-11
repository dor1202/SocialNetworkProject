const userDb = require('@services/DbService');
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
const jwt = require('@services/JwtService');
const FillUserModel = require('../../FillModelClass');

async function loginGoogle(req, res) {
    const {user} = req.body;
    // check if exist
    try {
        let userId = await userDb.FindFirst("user", "Email", user.email);
        if (userId == null) throw Error();
        if(userId.Platform !== 'google') return res.send({Status: false});
        let userTemplate = FillUserModel.fillUserModel(userId.Id, userId.UserName, userId.FirstName, userId.LastName, userId.Email);
        let jwtToken = jwt.GetToken({ 
            userTemplate
         }, userId.Id.toString());
        res.send({
            Status: true,
            Token: jwtToken,
            Avatar: userId.Avatar
        });
    }
    catch (err) {
        // not exist yet, create new user
        const UserName = user.name;
        $.get(`https://avatars.dicebear.com/api/initials/${UserName}.svg`, async (svgData, status) => {
            const currentUserData = {
                UserName: UserName,
                Password: '0',
                Email: user.email,
                FirstName: user.givenName,
                LastName: user.familyName,
                Avatar: svgData,
                PhoneNumber: '0',
                BirthDay: new Date(),
                Address: '',
                Platform: 'google'
            };
            // add to db
            let userInDB = await userDb.AddDataToDb("user", currentUserData);
            let userTemplate = FillUserModel.fillUserModel(userInDB.Id, userInDB.UserName, userInDB.FirstName, userInDB.LastName, userInDB.Email);
            let jwtToken = jwt.GetToken({ 
                userTemplate
             }, userInDB.Id.toString());
            res.send({
                Status: true,
                Token: jwtToken,
                Avatar: userInDB.Avatar
            });
        }, "text")
    }
}

module.exports = loginGoogle;