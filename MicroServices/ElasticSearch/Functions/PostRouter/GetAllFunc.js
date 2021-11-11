
const ElasticService = require('@Services/ElasticService');
const client = ElasticService.client;

async function GetAllFunc(req, res) {
    const { body } = await client.search({
        index: 'post',
        body: { query: { "match_all": {} }  }
    });
    res.send(body.hits.hits);
}

module.exports = GetAllFunc;