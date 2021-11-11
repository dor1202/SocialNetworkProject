const notificationText = require('@functions/Sockets/notificationTextEnum');
const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');

async function sendFriendRequestFunc(dataModel) {
    // check if invite already exist
    const { Data, socket } = dataModel;
    const { receiverId, receiverSocketId } = Data;
    let { sender } = Data;
    sender = parseInt(sender);
    const [exist, error] = await AwaitHandling(axios.SqlRequest.post('Notifications/FindNotification', { UserId: sender, ToId: receiverId }));
    if(!error){
        if (exist.data == '') {
            const [u, error1] = await AwaitHandling(axios.SqlRequest.get('Users/GetUser', { params: { userId: sender } }));
            if(!error1){
                const [template, error2] = await AwaitHandling(axios.SqlRequest.post('Notifications/AddNotification',{ UserId: sender, ToId: receiverId, Text: notificationText.FRIENDINVITE, isNotification: false, UserName: u.data.UserName, Image: u.data.Avatar }));
                if(!error2){
                    socket.to(receiverSocketId).emit('receiveNotification', template.data);
                }
            }
        }
    }
}

module.exports = sendFriendRequestFunc;