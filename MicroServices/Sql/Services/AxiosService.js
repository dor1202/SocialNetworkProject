const axios = require('axios');

class AxiosService {
    
    constructor() {
        if (AxiosService._instance) return AxiosService._instance
        AxiosService._instance = this;

        this.ElasticRequest = axios.create({ baseURL: process.env.ELASTIC_URL, timeout: 5000 });
    }
}

module.exports = AxiosService;