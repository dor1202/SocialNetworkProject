const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');
const Status = require('@Services/ServerStatus');

async function GetPost(req, res) {
    const [result, error] = await AwaitHandling(axios.SqlRequest.get('Posts/GetPost', { params: { id: req.query.id } }));
    if(!error) res.status(Status.OK.status).json(result.data);
    else res.status(Status.BAD.status).json(Status.BAD.message);
}

module.exports = GetPost;