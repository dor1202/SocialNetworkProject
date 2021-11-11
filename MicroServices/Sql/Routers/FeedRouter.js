
const FeedRouterService = require('@services/RoutersServices/FeedRouterService');
const express = require('express');
const router = express.Router();

// Requests
router.post('/getFeed', FeedRouterService.getFeed);
router.post('/getFeedByParameter', FeedRouterService.getFeedByParameter);

module.exports = router;