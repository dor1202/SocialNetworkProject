
const sendFriendRequestFunc = require('@functions/Sockets/friends/sendFriendRequestFunc');
const dismissNotificationFunc = require('@functions/Sockets/notifications/dismissNotificationFunc');
const receiveInviteFunc = require('@functions/Sockets/friends/receiveInviteFunc');
const refuseInviteFunc = require('@functions/Sockets/friends/refuseInviteFunc');
const notifyTagInCommentFunc = require('@functions/Sockets/friends/notifyTagInCommentFunc');
const SocketService = require('./SocketService');
const socketService = new SocketService();

class Manager {

    constructor() {
        if (Manager._instance) return Manager._instance
        Manager._instance = this;

        this.socketInit();
    }

    socketInit(){
        socketService.addEventListener('sendFriendRequest', sendFriendRequestFunc);
        socketService.addEventListener('dismissNotification', dismissNotificationFunc);
        socketService.addEventListener('receiveInvite', receiveInviteFunc);
        socketService.addEventListener('refuseInvite', refuseInviteFunc);
        socketService.addEventListener('notifyTagInComment', notifyTagInCommentFunc);
        
        // notify all
        // io.emit('recivedGroupChat', { data: data, userConnectionId: socket.id });
        // join group
        // socket.join(group);
        // emit in group
        // io.in(group).emit('recivedGroupChat', { data: data, userConnectionId: socket.id });
    }

}

module.exports = Manager;