const userDb = require('@services/DbService');

async function getFriendForProfile(req, res) {
    const query = req.headers['authorization'];
    const UserData = req.body.user;
    let friendArray = await userDb.FindAll("friend","UserId",UserData.Id);
    let temparray = [];
    let userToSend,tempUser;
    for (let index = 0; index < friendArray.length; index++) {
        //let tempUser = await userDb.FindFirst("user","UserId",friendArray[index].FriendId);
        tempUser = await userDb.FindGroupByWithWhere("user",["Id","UserName","Avatar"],"Id",friendArray[index].FriendId);
        let userToSend = {id: tempUser[0].Id,userName:tempUser[0].UserName,Image:tempUser[0].Avatar.toString(),isBlocked:friendArray[index].IsBlocked}
        temparray.push(tempUser);
    }
    res.send(friendArray);
}

module.exports = getFriendForProfile;