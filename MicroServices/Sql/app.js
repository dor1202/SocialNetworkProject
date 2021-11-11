const FriendsRouter = require('@routers/FriendsRouter');
const postRouter = require('@routers/postRouter');
const FeedRouter = require('@routers/FeedRouter');
const UserRouter = require('@routers/UserRouter');
const NotificationRouter = require('@routers/NotificationRouter');
const rfs = require('rotating-file-stream');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3004;
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
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use("/Friends",FriendsRouter);
app.use("/Posts",postRouter);
app.use("/Users",UserRouter);
app.use("/Feed",FeedRouter);
app.use("/Notifications",NotificationRouter);

app.listen(port, () => console.log(`app is up listen: ${port}`));

module.exports = app;