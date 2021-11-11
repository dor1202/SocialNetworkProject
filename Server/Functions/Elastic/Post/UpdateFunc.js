const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');
const Status = require('@Services/ServerStatus');

async function UpdateFunc(req, res) {
    const [result, error] = await AwaitHandling(axios.ElasticRequest.put('Post/UpdatePost', {post:req.body.post}));
    if(!error) res.status(Status.OK.status).json(result.data);
    else res.status(Status.BAD.status).json(Status.BAD.message);
}

module.exports = UpdateFunc;