const moqToken = require('./MoqToken');
const mockReq = { headers: { 'authorization': moqToken } };
module.exports = mockReq;