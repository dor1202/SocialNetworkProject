import SocketService from 'Services/SocketService/SocketService';
import SessionStorageService from "Services/SessionServices/SessionStorageServiceSync";
import JWTService from 'Services/JWTService/JWTService';

const socket = SocketService.socket;

const friendSocketService = {
    notifyTagInComment(friendId, postId){
        const userSession = SessionStorageService.getFromSessionStorage('User');
        const userId = JWTService.DecodeToken(userSession).userTemplate.Id;
        socket.emit('notifyTagInComment', {user: userId, friendId, postId});
    },
    sendFriendRequest(id) {
        socket.emit('sendFriendRequest', {id});
    },
    dismissNotification(id){
        socket.emit('dismissNotification', {id});
    },
    receiveInvite(id){
        socket.emit('receiveInvite', {id});
    },
    refuseInvite(id){
        socket.emit('refuseInvite', {id});
    },
};

export default friendSocketService;