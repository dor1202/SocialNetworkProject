const userDb = require('@services/DbService');

async function findNotification(req, res) {
    const {UserId, ToId} = req.body;
    const p = userDb.GetPrismaClient();
    const exist = await p.notification.findFirst({ where: { UserId: UserId, ToId: ToId, } });
    res.send(exist);
}

module.exports = findNotification;