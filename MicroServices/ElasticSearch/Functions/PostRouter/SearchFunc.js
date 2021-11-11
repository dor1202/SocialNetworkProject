
const ElasticService = require('@Services/ElasticService');
const client = ElasticService.client;

async function SearchFunc(req, res) {
    const query = req.query;
    // build the query
    var finalQuery = [];
    for (var x in query) if (query.hasOwnProperty(x)) {
        const element = [x][0];
        switch (element) {
            case 'LocationLat':
            case 'LocationLan':
                {
                    const parsed = parseFloat(query[x]);
                    if (isNaN(parsed)) finalQuery.push({ match: { [x]: query[x] } });
                    else finalQuery.push({ match: { [x]: parsed } });
                    break;
                }
            case 'UserId':
                {
                    const parsed = parseInt(query[x]);
                    if (isNaN(parsed)) finalQuery.push({ match: { [x]: query[x] } });
                    else finalQuery.push({ match: { [x]: parsed } });
                    break;
                }
            default:
                {
                    finalQuery.push({ match: { [x]: query[x] } });
                    break;
                }
        }
    }
    const { body } = await client.search({
        index: 'post',
        body: {
            query: {
                bool: {
                    should: finalQuery
                }
            }
        }
    });
    res.send(body.hits.hits);
}

module.exports = SearchFunc;