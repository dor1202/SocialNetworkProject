// const userDb = require('@services/DbService');
const SocketService = require('@sockets/SocketService');
const socketDictionary = new SocketService().socketDictionary;
const notificationText = require('@functions/Sockets/notificationTextEnum');
const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');

async function receiveInviteFunc(dataModel) {
    const { Data, socket } = dataModel;
    let { notificationId, sender } = Data;
    notificationId= parseInt(notificationId);
    sender = parseInt(sender);
    const [deletedNotification, error] = await AwaitHandling(axios.SqlRequest.post('Notifications/DiscardNotification', {notificationId: notificationId}));
    if(!error){
        const {UserId, ToId} = deletedNotification.data;
        const [user, error1] = await AwaitHandling(axios.SqlRequest.get('Users/GetUser', { params: { userId: UserId } }));
        if(!error1){
            const [friend, error2] = await AwaitHandling(axios.SqlRequest.get('Users/GetUser', { params: { userId: ToId } }));
            if(!error2){
                // add friend to both of them
                // user:
                const [newFriend, error3] = await AwaitHandling(axios.SqlRequest.post('Friends/AddFriend',{friend: user.data.Id, user: friend.data}));
                if(!error3){
                    const socketData = { userName: user.data.UserName, id: user.data.Id, image: user.data.Avatar, isBlocked: newFriend.data.isBlocked, alreadyExist: false };
                    socket.emit('receiveReceiveInvite', socketData);
                    const [template, error4] = await AwaitHandling(axios.SqlRequest.post('Notifications/AddNotification',{ UserId: ToId, ToId: UserId, Text: notificationText.ACCEPTFRIEND, isNotification: true, UserName: user.data.UserName, Image: user.data.Avatar }));
                    if(!error4){
                        socket.emit('receiveNotification', template.data);
                        socket.emit('receiveDismissNotification', notificationId);
    
                        // friend:
                        const receiverSocketId = socketDictionary[UserId];
                        const [newFriend, error5] = await AwaitHandling(axios.SqlRequest.post('Friends/AddFriend',{friend: friend.data.Id, user: user.data}));
                        if(!error5){
                            const socketData = { userName: friend.data.UserName, id: friend.data.Id, image: friend.data.Avatar, isBlocked: newFriend.data.isBlocked, alreadyExist: false };
                            socket.to(receiverSocketId).emit('receiveReceiveInvite', socketData);
                            const [template1, error6] = await AwaitHandling(axios.SqlRequest.post('Notifications/AddNotification',{ UserId: UserId, ToId: ToId, Text: notificationText.ACCEPTFRIEND, isNotification: true, UserName: friend.data.UserName, Image: friend.data.Avatar }));
                            if(!error6){
                                socket.to(receiverSocketId).emit('receiveNotification', template1.data);
                            }
                        }
                    }
                }
            }
        }
    }
}

module.exports = receiveInviteFunc;