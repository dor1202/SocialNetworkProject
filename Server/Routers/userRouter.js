
const LoginAuthentication = require('@middleware/AuthenticationService').LoginAuthentication;
const UserRouterService = require('@services/RoutersServices/UserRouterService');
const express = require('express');
const router = express.Router();

// Requests

router.get('/GetUserImagesByEmail', LoginAuthentication, UserRouterService.GetUserImagesByEmail);
router.get('/GetNotifications', LoginAuthentication, UserRouterService.GetNotifications);
router.get('/GetUserImages', LoginAuthentication, UserRouterService.GetUserImages);
router.get('/GetUser', LoginAuthentication, UserRouterService.getUser);
router.get('/GetUserByMail', LoginAuthentication, UserRouterService.GetUserByMail);
router.post('/ResetPasswordMail', UserRouterService.sendResetMail);
router.post('/loginFacebook', UserRouterService.loginFacebook);
router.post('/ResetPassword', UserRouterService.resetPassword);
router.post('/loginGoogle', UserRouterService.loginGoogle);
router.post('/createUser', UserRouterService.signup);
router.post('/login', UserRouterService.login);



module.exports = router;