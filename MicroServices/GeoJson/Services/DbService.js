
const mongoose = require('mongoose');

class DbService {
    constructor() {
        if (DbService._instance) return DbService._instance
        DbService._instance = this;

        mongoose.connect(process.env.MONGO_UTI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
            .then((res) => console.log('connected to db'))
            .catch((err) => console.log(err));
        mongoose.connection.on('connected', () => console.log("MongoDB Connected!"));
    }
}

module.exports = DbService;