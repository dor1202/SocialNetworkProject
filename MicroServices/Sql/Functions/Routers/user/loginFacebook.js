const userDb = require('@services/DbService');
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
const jwt = require('@services/JwtService');
const FillUserModel = require('../../FillModelClass');

async function loginFacebook(req, res) {
    const {user} = req.body;
    // check if exist
    try {
        let userInDB = await userDb.FindFirst("user", "Email", user.email);
        if (userInDB == null) throw Error();
        if(userInDB.Platform !== 'facebook') return res.send({Status: true});
        let userTemplate = FillUserModel.fillUserModel(userInDB.Id, userInDB.UserName, userInDB.FirstName, userInDB.LastName, userInDB.Email);
        let jwtToken = jwt.GetToken({ 
            userTemplate
         }, userInDB.Id.toString());
        res.send({
            Status: true,
            Token: jwtToken,
            Avatar: userInDB.Avatar
        });
    }
    catch (err) {
        // not exist yet, create new user
        const nameArray = user.name.split(' ');
        const firstName = nameArray[0];
        let lastName = '';
        for (let index = 1; index < nameArray.length; index++) {
            lastName += nameArray[index] + ' ';
        }
        $.get(`https://avatars.dicebear.com/api/initials/${user.name}.svg`, async (svgData, status) => {
            const currentUserData = {
                UserName: user.name,
                Password: '0',
                Email: user.email,
                FirstName: firstName,
                LastName: lastName,
                Avatar: svgData,
                PhoneNumber: '0',
                BirthDay: new Date(),
                Address: '',
                Platform: 'facebook'
            };
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

module.exports = loginFacebook;