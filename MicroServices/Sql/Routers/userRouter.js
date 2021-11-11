
const UserRouterService = require('@services/RoutersServices/UserRouterService');
const express = require('express');
const router = express.Router();

// Requests

router.get('/GetUserImagesByEmail', UserRouterService.GetUserImagesByEmail);
router.get('/GetNotifications', UserRouterService.GetNotifications);
router.get('/GetUserImages', UserRouterService.GetUserImages);
router.get('/GetUser', UserRouterService.getUser);
router.get('/GetUserByMail', UserRouterService.GetUserByMail);
router.post('/loginFacebook', UserRouterService.loginFacebook);
router.post('/ResetPassword', UserRouterService.resetPassword);
router.post('/loginGoogle', UserRouterService.loginGoogle);
router.post('/createUser', UserRouterService.signup);
router.post('/login', UserRouterService.login);



module.exports = router;