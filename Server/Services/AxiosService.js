const axios = require('axios');

class AxiosService {
    
    constructor() {
        if (AxiosService._instance) return AxiosService._instance
        AxiosService._instance = this;

        this.SqlRequest = axios.create({ baseURL: process.env.SQL_URL, timeout: 5000 });
        this.ElasticRequest = axios.create({ baseURL: process.env.ELASTIC_URL, timeout: 5000 });
        this.GEORequest = axios.create({ baseURL: process.env.GEO_URL, timeout: 5000 });
    }
}

module.exports = AxiosService;