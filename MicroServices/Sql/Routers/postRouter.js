
const PostRouterService = require('@services/RoutersServices/PostRouterService');
const express = require('express');
const router = express.Router();

// Requests
router.get('/GetTaggedUsers', PostRouterService.GetTaggedUsers);
router.get('/GetComments', PostRouterService.GetComments);
router.post('/AddComment', PostRouterService.AddComment);
router.get('/GetLikes', PostRouterService.getLikes);
router.get('/AddLike', PostRouterService.AddLike);
router.post('/GetTags',PostRouterService.getTags);
router.post('/GetAllTags',PostRouterService.getAllTags);
router.post('/CreateByElastic',PostRouterService.CreatePostTo);
router.post('/AddTaggedUser',PostRouterService.AddTaggedUser);
router.post('/AddTags',PostRouterService.AddTags);
router.post('/FindTag',PostRouterService.FindTag);
router.post('/AddTagToPost',PostRouterService.AddTagToPost);

module.exports = router;