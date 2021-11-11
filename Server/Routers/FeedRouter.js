
const LoginAuthentication = require('@middleware/AuthenticationService').LoginAuthentication;
const FeedRouterService = require('@services/RoutersServices/FeedRouterService');
const express = require('express');
const router = express.Router();

// Requests
router.post('/getFeed', LoginAuthentication, FeedRouterService.getFeed);
router.post('/getFeedByParameter', LoginAuthentication, FeedRouterService.getFeedByParameter);

module.exports = router;