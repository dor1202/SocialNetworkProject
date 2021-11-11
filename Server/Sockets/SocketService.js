
const EventEmitter = require('events');
const Socket = require('socket.io');
const JwtService = require('@services/JwtService');

class SocketService {

    constructor(server) {
        if (SocketService._instance) return SocketService._instance
        SocketService._instance = this;
        this.io = Socket(server, { cors: { origin: '*' } });
        this.event = new EventEmitter.EventEmitter();
        this.server = server;
        this.socketDictionary = {};

        this.io.on("connection", socket => {
            const userJwtData = socket.handshake.query.user;
            if (userJwtData == 'empty') socket.disconnect(true);
            else {
                // save to dictionary
                const userDecode = JwtService.DecodeToken(userJwtData);
                const expiredTime = userDecode.exp;
                if (Date.now() <= expiredTime * 1000) {
                    const userData = userDecode.userTemplate;
                    this.socketDictionary[userData.Id] = socket.id;
                    console.log(this.socketDictionary);
                }
            }
            socket.on("disconnect", (reason) => console.log(reason));
            socket.on('sendFriendRequest', (data) => { this.event.emit('sendFriendRequest', { socket, Data: { receiverId: data.id, receiverSocketId: this.socketDictionary[data.id], sender: this.getKeyByValue(this.socketDictionary, socket.id)} }); });
            socket.on('dismissNotification', (data) => { this.event.emit('dismissNotification', { socket, Data: { notificationId: data.id, sender: this.getKeyByValue(this.socketDictionary, socket.id)} }); });
            socket.on('receiveInvite', (data) => { this.event.emit('receiveInvite', { socket, Data: { notificationId: data.id, sender: this.getKeyByValue(this.socketDictionary, socket.id)} }); });
            socket.on('refuseInvite', (data) => { this.event.emit('refuseInvite', { socket, Data: { notificationId: data.id, sender: this.getKeyByValue(this.socketDictionary, socket.id)} }); });
            socket.on('notifyTagInComment', (data) => { this.event.emit('notifyTagInComment', { socket, Data: data }); });
            
        
        });
    }

    addEventListener = (eventName, func) => this.event.addListener(eventName, func);
    getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);
}

module.exports = SocketService;