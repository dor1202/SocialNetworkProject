// express
require('dotenv').config({path: __dirname + '/.env'})
const rfs = require('rotating-file-stream');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3002;
const CRUD = require('@Routers/CRUD');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();

// create a rotating write stream
let accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'Logs')
});

// use
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan('combined', { stream: accessLogStream }))
app.use(cors());
app.use(CRUD);

// init db
const DbService = require('@Services/DbService');
const init = new DbService();

app.listen(PORT, () => console.log(`${PORT} is up`));

