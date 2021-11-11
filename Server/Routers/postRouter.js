
const LoginAuthentication = require('@middleware/AuthenticationService').LoginAuthentication;
const PostAuthentication = require('@middleware/AuthenticationService').PostAuthentication;
const PostRouterService = require('@services/RoutersServices/PostRouterService');
const express = require('express');
const router = express.Router();

// Requests
router.get('/GetPost', LoginAuthentication, PostRouterService.GetPost);
router.get('/GetTaggedUsers', LoginAuthentication, PostRouterService.GetTaggedUsers);
router.get('/GetComments', LoginAuthentication, PostRouterService.GetComments);
router.post('/AddComment', LoginAuthentication, PostRouterService.AddComment);
router.get('/DeletePost', LoginAuthentication, PostRouterService.deletePost);
router.post('/CreatePost',PostAuthentication, PostRouterService.CreatePost);
router.get('/GetLikes', LoginAuthentication, PostRouterService.getLikes);
router.get('/AddLike', LoginAuthentication, PostRouterService.AddLike);
router.post('/EditPost',PostAuthentication,PostRouterService.UpdateFunc);
router.post('/GetTags',PostAuthentication,PostRouterService.getTags);
router.post('/GetAllTags',PostAuthentication,PostRouterService.getAllTags);


module.exports = router;