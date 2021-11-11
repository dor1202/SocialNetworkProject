const JwtService = require('@services/JwtService');

class AuthenticationService {
    static LoginAuthentication(req, res, next) {
        if (!req.headers || !req.headers['authorization'] || req.headers['authorization'] == 'null') {
            res.statusCode = 403;
            res.json({ error: "Missing JWT token from the 'Authorization' header" });
        }
        else {
            const data = JwtService.DecodeToken(req.headers['authorization']);
            const expiredTime = data.exp;
            if (Date.now() >= expiredTime * 1000) {
                res.statusCode = 403;
                res.json({ error: "JWT token has expired" });
            }
            else next();
        }
    }
    static PostAuthentication(req, res, next) {
        next();
    }
}

module.exports = AuthenticationService;