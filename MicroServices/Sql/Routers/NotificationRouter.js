
const NotificationRouterService = require('@services/RoutersServices/NotificationRouterService');
const express = require('express');
const router = express.Router();

// Requests
router.post('/DiscardNotification', NotificationRouterService.discardNotification);
router.post('/AddNotification', NotificationRouterService.addNotification);
router.post('/FindNotification', NotificationRouterService.findNotification);

module.exports = router;