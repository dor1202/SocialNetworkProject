
const jwt = require('jsonwebtoken');

class JwtService {
    static GetToken = (Token ,secretKey) => jwt.sign(Token, secretKey, {expiresIn: '200m'});
    
    static DecodeToken = (encryptToken) => jwt.decode(encryptToken);
    
    static VerifyToken(encryptToken, secretKey){
        try{ return jwt.verify(encryptToken, secretKey); }
        catch(err){ return false; }
    }
}

module.exports = JwtService;