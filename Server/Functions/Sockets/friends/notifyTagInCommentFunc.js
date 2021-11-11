const notificationText = require('@functions/Sockets/notificationTextEnum');
const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');
const SocketService = require('@sockets/SocketService');
const socketDictionary = new SocketService().socketDictionary;

async function notifyTagInCommentFunc(dataModel) {
    // check if invite already exist
    const { Data, socket } = dataModel;
    const { user, friendId, postId } = Data;
    const [u, error1] = await AwaitHandling(axios.SqlRequest.get('Users/GetUser', { params: { userId: user } }));
    if(!error1){
        const [template, error2] = await AwaitHandling(axios.SqlRequest.post('Notifications/AddNotification',{ UserId: user, ToId: friendId, Text: notificationText.MENSIONINCOMMENT, isNotification: true, UserName: u.data.UserName, Image: u.data.Avatar }));
        if(!error2){
            const receiverSocketId = socketDictionary[friendId];
            socket.to(receiverSocketId).emit('receiveNotification', template.data);
        }
    }
}

module.exports = notifyTagInCommentFunc;