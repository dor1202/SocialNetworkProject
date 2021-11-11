const userDb = require('@services/DbService');
const { NotificationType } = require("@prisma/client");

async function addNotification(req, res) {
    const {UserId, ToId, Text, isNotification, UserName, Image} = req.body;
    let data = {};
    if(isNotification){
        data = { UserId: UserId, ToId: ToId, Text: Text, NotificationType: NotificationType.NOTIFY };

    }
    else{
        data = { UserId: UserId, ToId: ToId, Text: Text, NotificationType: NotificationType.FEEDBACK };
    }
    const newNotification = await userDb.AddDataToDb("notification", data);
    const responseTemplate = { Id: newNotification.Id, Text: newNotification.Text, TimeStamp: newNotification.TimeStamp, NotificationType: newNotification.NotificationType, UserName: UserName, Image: Image };
    res.send(responseTemplate);
}

module.exports = addNotification;