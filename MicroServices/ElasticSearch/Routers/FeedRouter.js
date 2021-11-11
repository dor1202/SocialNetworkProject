const FeedRouterService = require('@Services/RouterServices/FeedRouterService');
const express = require('express');
const router = express.Router();

// Requests
router.post('/GetFeed', FeedRouterService.GetFeed);

module.exports = router;