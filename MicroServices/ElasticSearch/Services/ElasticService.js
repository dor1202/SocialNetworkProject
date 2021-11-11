const { Client } = require('@elastic/elasticsearch')

class ElasticService {
    static client = new Client({
        node: 'http://localhost:9200',
        maxRetries: 5,
        requestTimeout: 60000,
        sniffOnStart: true
    });
}

module.exports = ElasticService;