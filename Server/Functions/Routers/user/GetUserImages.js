const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');
const Status = require('@Services/ServerStatus');
const JwtService = require('@services/JwtService');

async function GetUserImages(req, res) {
    const query = req.headers['authorization'];
    const userData = JwtService.DecodeToken(query).userTemplate;
    const [result, error] = await AwaitHandling(axios.SqlRequest.get('Users/GetUserImages', { params: { userMail: userData.Email } }));
    if (!error) res.status(Status.OK.status).json(result.data);
    else res.status(Status.BAD.status).json(Status.BAD.message);
}

module.exports = GetUserImages;