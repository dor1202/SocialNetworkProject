const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');
const Status = require('@Services/ServerStatus');

async function addFriendToGroup(req, res) {
    const [result, error] = await AwaitHandling(axios.SqlRequest.post('Friends/AddFriendToGroup',{group: req.body.group, user: req.body.user }));
    if(!error) res.status(Status.OK.status).json(result.data);
    else res.status(Status.BAD.status).json(Status.BAD.message);
}

module.exports = addFriendToGroup;