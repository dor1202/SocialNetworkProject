require('dotenv').config({path: __dirname + '/.env'})
const FriendsRouter = require('@routers/FriendsRouter');
const postRouter = require('@routers/postRouter');
const FeedRouter = require('@routers/FeedRouter');
const UserRouter = require('@routers/UserRouter');
const rfs = require('rotating-file-stream');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const Axios = require('@Services/AxiosService');
const axios = new Axios();

// create a rotating write stream
let accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'Logs')
});

// set
app.set('view engine', 'pug')

// use
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use("/Friends",FriendsRouter);
app.use("/Posts",postRouter);
app.use("/Users",UserRouter);
app.use("/Feed",FeedRouter);

const server = app.listen(port, () => {
    console.log(`app is up listen: ${port}`);
});

// socket init
const SocketService = require('@sockets/SocketService');
const socketService = new SocketService(server);

const SocketsManager = require('@sockets/SocketsManager');
const socketsManager = new SocketsManager();


module.exports = app;