const Axios = require('@Services/AxiosService');
const axios = new Axios();
const JwtService = require('@services/JwtService');
const AwaitHandling = require('@Services/AwaitHandling');
const Status = require('@Services/ServerStatus');

async function blockFriend(req, res) {
    const query = req.headers['authorization'];
    const userData = JwtService.DecodeToken(query).userTemplate;
    const [result, error] = await AwaitHandling(axios.SqlRequest.post('Friends/BlockFriend',{userEmail: userData.Email}));
    if(!error) res.status(Status.OK.status).json(result.data);
    else res.status(Status.BAD.status).json(Status.BAD.message);
}

module.exports = blockFriend;