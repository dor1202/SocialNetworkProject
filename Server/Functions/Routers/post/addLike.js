const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');
const Status = require('@Services/ServerStatus');
const JwtService = require('@services/JwtService');
const SocketService = require('@Sockets/SocketService');
const notificationText = require('@functions/Sockets/notificationTextEnum');

async function addLike(req, res) {
    const query = req.headers['authorization'];
    const userData = JwtService.DecodeToken(query).userTemplate;
    const [result, error] = await AwaitHandling(axios.SqlRequest.get('Posts/AddLike', { params: { userEmail: userData.Email, id: req.query.id } }));
    if(!error) {
        const [post, error1] = await AwaitHandling(axios.ElasticRequest.get('Post/getById', {params: {id:req.query.id}}));
        if(!error1 && result.data.isLike){
            const socketService = new SocketService(null);
            const socketId = socketService.socketDictionary[post.data._source.UserId];
            if (socketId != undefined) {
                const [user, error2] = await AwaitHandling(axios.SqlRequest.get('Users/GetUser', { params: { userId: userData.Id } }));
                if(!error2){
                    const [template, error3] = await AwaitHandling(axios.SqlRequest.post('Notifications/AddNotification',{ UserId: userData.Id, ToId: post.data._source.UserId, Text: notificationText.LIKEPHOTO, isNotification: true, UserName: userData.UserName, Image: user.data.Avatar }));
                    if(!error3){
                        socketService.io.to(socketId).emit('receiveNotification', template.data);
                    }
                }
            }
        }
        res.status(Status.OK.status).json(result.data.likes);
    }
    else res.status(Status.BAD.status).json(Status.BAD.message);
}

module.exports = addLike;