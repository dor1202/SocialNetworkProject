const SocketService = require('@sockets/SocketService');
const socketDictionary = new SocketService().socketDictionary;
const notificationText = require('@functions/Sockets/notificationTextEnum');
const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');

async function refuseInviteFunc(dataModel) {
    const { Data, socket } = dataModel;
    let { notificationId, sender } = Data;
    notificationId = parseInt(notificationId);
    sender = parseInt(sender);
    const [deletedNotification, error] = await AwaitHandling(axios.SqlRequest.post('Notifications/DiscardNotification', { notificationId: notificationId }));
    if (!error) {
        const { UserId, ToId } = deletedNotification.data;
        const [friend, error1] = await AwaitHandling(axios.SqlRequest.get('Users/GetUser', { params: { userId: ToId } }));
        if (!error1) {
            socket.emit('receiveDismissNotification', notificationId);

            // friend:
            const receiverSocketId = socketDictionary[UserId];
            const [template, error2] = await AwaitHandling(axios.SqlRequest.post('Notifications/AddNotification',{ UserId: ToId, ToId: UserId, Text: notificationText.REFUSEFRIEND, isNotification: true, UserName: friend.data.UserName, Image: friend.data.Avatar }));
            if(!error2){
                socket.to(receiverSocketId).emit('receiveNotification', template.data);
            }
        }
    }
}

module.exports = refuseInviteFunc;