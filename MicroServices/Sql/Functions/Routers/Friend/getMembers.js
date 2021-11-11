const userDb = require('@services/DbService');

async function getMembers(req, res) {
    let userInDB = await userDb.FindGroupBy("user",["Id","UserName","Avatar"]);
    let userReq = [];
    for (let i = 0; i < userInDB.length; i++) {
        userReq.push({key: userInDB[i].UserName,text: userInDB[i].UserName,value: userInDB[i].Id,image: { avatar: true, src:userInDB[i].Avatar}})
    }
    res.send(userReq);
}

module.exports = getMembers;