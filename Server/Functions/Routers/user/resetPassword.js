const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');
const Status = require('@Services/ServerStatus');

async function resetPassword(req, res) {
    const [result, error] = await AwaitHandling(axios.SqlRequest.post('Users/ResetPassword',{email: req.body.email, password: req.body.password}));
    if(!error) res.status(Status.OK.status).json(result.data);
    else res.status(Status.BAD.status).json(Status.BAD.message);
}


module.exports = resetPassword;