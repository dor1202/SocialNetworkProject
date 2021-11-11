
import jwt from 'jwt-decode';

const JWTService = {
    DecodeToken(token) {
        return jwt(token);
    }
}
export default JWTService;