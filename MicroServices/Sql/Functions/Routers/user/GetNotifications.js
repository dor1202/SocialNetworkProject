const userDb = require('@services/DbService');

async function GetNotifications(req, res) {
    const {userEmail} = req.query;
    const userInDB = await userDb.FindFirst("user", "Email", userEmail);
    const notifications = await userDb.FindAll("notification", "ToId", userInDB.Id);
    let tmp = [];
    for (let index = 0; index < notifications.length; index++) {
        const user = await userDb.FindFirst("user", "Id", notifications[index].UserId);
        tmp.push({
            Id:notifications[index].Id,
            Text:notifications[index].Text,
            TimeStamp:notifications[index].TimeStamp,
            NotificationType: notifications[index].NotificationType,
            UserName: user.UserName,
            Image: user.Avatar
        });
    }
    res.send(tmp);
}

module.exports = GetNotifications;