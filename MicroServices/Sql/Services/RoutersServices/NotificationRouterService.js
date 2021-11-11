
const discardNotification = require('@functions/Routers/Notification/discardNotification');
const addNotification = require('@functions/Routers/Notification/addNotification');
const findNotification = require('@functions/Routers/Notification/findNotification');

class NotificationRouterService {
    static discardNotification = (req, res) => discardNotification(req, res);
    static addNotification = (req, res) => addNotification(req, res);
    static findNotification = (req, res) => findNotification(req, res);
}

module.exports = NotificationRouterService;