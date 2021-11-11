
const ElasticService = require('@Services/ElasticService');
const client = ElasticService.client;

async function DeleteFunc(req, res) {
    const {id} = req.body;
    await client.delete({
        index: 'post',
        id: id
    });
    res.send('deleted');
}

module.exports = DeleteFunc;