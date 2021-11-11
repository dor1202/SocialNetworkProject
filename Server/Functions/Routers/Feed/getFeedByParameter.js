const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');
const Status = require('@Services/ServerStatus');

async function getFeedByParameter(req, res) {
    const [result, error] = await AwaitHandling(axios.SqlRequest.post('Feed/getFeedByParameter',{filterData: req.body.filterData, center: req.body.center}));
    if(!error) res.status(Status.OK.status).json(result.data);
    else res.status(Status.BAD.status).json(Status.BAD.message);
}

module.exports = getFeedByParameter;