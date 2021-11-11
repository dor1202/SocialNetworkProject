
const ElasticService = require('@Services/ElasticService');
const client = ElasticService.client;

async function GetByIdFunc(req, res) {
    const {id} = req.query;
    const { body } = await client.get({
        index: 'post',
        id: id
    })
    res.send(body);
}

module.exports = GetByIdFunc;