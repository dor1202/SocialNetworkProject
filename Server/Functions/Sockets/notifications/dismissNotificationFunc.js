const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');

async function dismissNotificationFunc(dataModel) {
    const { Data, socket } = dataModel;
    let { notificationId, sender } = Data;
    notificationId= parseInt(notificationId);
    sender = parseInt(sender);
    const [result, error] = await AwaitHandling(axios.SqlRequest.post('Notifications/DiscardNotification', {notificationId: notificationId}));
    if(!error) socket.emit('receiveDismissNotification', notificationId);
}

module.exports = dismissNotificationFunc;