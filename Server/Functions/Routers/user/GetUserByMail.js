const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');
const Status = require('@Services/ServerStatus');

async function GetUserByMail(req, res) {
    const [result, error] = await AwaitHandling(axios.SqlRequest.get('Users/GetUserByMail', { params: { userMail: req.query.user } }));
    if (!error) res.status(Status.OK.status).json(result.data);
    else res.status(Status.BAD.status).json(Status.BAD.message);
}

module.exports = GetUserByMail;