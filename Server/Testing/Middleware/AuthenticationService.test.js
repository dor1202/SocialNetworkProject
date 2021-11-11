const AuthenticationService = require('@middleware/AuthenticationService');
const jwt = require('@services/JwtService');
const FillUserModel = require('@functions/FillModelClass');

describe('Login authentication', () => {
    test('Without headers', async () => {
        const mockReq = {};
        const mockRes = { json: jest.fn() };
        const mockNextFunc = jest.fn()
        const expectedResponse = { "error": "Missing JWT token from the 'Authorization' header" };
        AuthenticationService.LoginAuthentication(mockReq, mockRes, mockNextFunc);
        expect(mockRes.json).toBeCalledWith(expectedResponse);
    });

    test('With "authorization" header', async () => {
        let userTemplate = FillUserModel.fillUserModel(1, 'dor', 'dor', 'schreiber', 'dor@gmail.com');
        let jwtToken = jwt.GetToken({ userTemplate }, '1');
        const mockReq = { headers: { 'authorization': jwtToken } };
        const mockRes = { json: jest.fn() };
        const mockNextFunc = jest.fn();
        AuthenticationService.LoginAuthentication(mockReq, mockRes, mockNextFunc);
        expect(mockNextFunc).toBeCalledTimes(1);
    });

    test('Without "authorization" header', async () => {
        const expectedResponse = { "error": "Missing JWT token from the 'Authorization' header" };
        mockReq = { headers: {} };
        const mockRes = { json: jest.fn() };
        const mockNextFunc = jest.fn();
        AuthenticationService.LoginAuthentication(mockReq, mockRes, mockNextFunc);
        expect(mockRes.json).toBeCalledWith(expectedResponse);
    });
});

describe('Post authentication', () => {
    test('bb', () => {
        //TODO:
    });
});

