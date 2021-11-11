const JwtService = require('@services/JwtService');

describe('Manage tokens', () => {
    test('Generate token', () => {
        const tokenData = { foo: 'bar' };
        const key = 'shhhh';
        const res = JwtService.GetToken(tokenData, key);
        const expected = 144;
        expect(res.length).toBe(expected);
    });
    
    test('Decode token', () => {
        const tokenData = { foo: 'bar' };
        const key = 'shhhh';
        const token = JwtService.GetToken(tokenData, key);
        const res = JwtService.DecodeToken(token);
        const expected = 'bar';
        expect(res.foo).toBe(expected);
    });
    
    test('Verify token', () => {
        const tokenData = { foo: 'bar' };
        const key = 'shhhh';
        const token = JwtService.GetToken(tokenData, key);
        const res = JwtService.VerifyToken(token, key);
        const expected = 'bar';
        expect(res.foo).toBe(expected);
    });
});
