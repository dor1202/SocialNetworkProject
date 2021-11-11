const userDb = require('@services/DbService');

async function discardNotification(req, res) {
    const {notificationId} = req.body;
    const deletedNotification = await userDb.DeleteElement("notification", "Id", notificationId);
    res.send(deletedNotification);
}

module.exports = discardNotification;