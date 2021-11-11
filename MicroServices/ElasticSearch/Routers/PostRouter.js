const PostRouterService = require('@Services/RouterServices/PostRouterService');
const express = require('express');
const router = express.Router();

// Requests
router.get('/GetById', PostRouterService.GetByIdFunc);
router.get('/SearchPost', PostRouterService.Search);
router.get('/GetPost', PostRouterService.GetAll);
router.post('/CreatePost', PostRouterService.Create);
router.put('/UpdatePost', PostRouterService.Update);
router.delete('/DeletePost', PostRouterService.Delete);

module.exports = router;