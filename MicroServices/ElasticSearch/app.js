require('dotenv').config({path: __dirname + '/.env'})
const bodyParser = require("body-parser");
const port = process.env.PORT || 3003;
const express = require('express');
const cors = require('cors');
const app = express();
const PostRouter = require('@Routers/PostRouter');
const FeedRouter = require('@Routers/FeedRouter');

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use("/Post", PostRouter);
app.use("/Feed", FeedRouter);

app.listen(port, () => console.log(`app is up listen: ${port}`));

module.exports = app;