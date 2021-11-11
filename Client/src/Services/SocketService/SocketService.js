import io from 'socket.io-client';

class SocketService {
    static socket = io.connect(process.env.REACT_APP_serverUrl, {query: `user=${sessionStorage.getItem("User") === null? 'empty': sessionStorage.getItem("User")}`});

    static listen(event) {
        return new Promise((resolve, reject) => {
            this.socket.on(event, (data)=> resolve(data));
        });
    }
}

export default SocketService;