const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');
const Status = require('@Services/ServerStatus');
const JwtService = require('@services/JwtService');

async function addComment(req, res) {
    const query = req.headers['authorization'];
    const userData = JwtService.DecodeToken(query).userTemplate;
    const [result, error] = await AwaitHandling(axios.SqlRequest.post('Posts/AddComment', { userEmail: userData.Email , id: req.query.id, comment: req.body.comment }));
    if(!error) res.status(Status.OK.status).json(result.data);
    else res.status(Status.BAD.status).json(Status.BAD.message);
}

module.exports = addComment;