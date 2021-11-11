
const loginFacebook = require('@functions/Routers/user/loginFacebook');
const resetPassword = require('@functions/Routers/user/resetPassword');
const loginGoogle = require('@functions/Routers/user/loginGoogle');
const getUser = require('@functions/Routers/user/getUser');
const signup = require('@functions/Routers/user/signup');
const login = require('@functions/Routers/user/login');
const GetNotifications = require('@functions/Routers/user/GetNotifications');
const GetUserImages = require('@functions/Routers/user/GetUserImages');
const GetUserByMail = require('@functions/Routers/user/GetUserByMail');
const GetUserImagesByEmail = require('@functions/Routers/user/GetUserImagesByEmail');

class UserRouterService {
    
    static GetUserImagesByEmail = (req,res) => GetUserImagesByEmail(req,res);
    static GetUserByMail = (req,res) => GetUserByMail(req,res);
    static GetUserImages = (req,res) => GetUserImages(req,res);
    static GetNotifications = (req,res) => GetNotifications(req,res);
    static loginFacebook = (req,res) => loginFacebook(req,res);
    static resetPassword = (req,res) => resetPassword(req,res);
    static loginGoogle = (req,res) => loginGoogle(req,res);
    static getUser = (req,res) => getUser(req,res);
    static signup = (req,res) => signup(req,res);
    static login = (req,res) => login(req,res);
}

module.exports = UserRouterService;