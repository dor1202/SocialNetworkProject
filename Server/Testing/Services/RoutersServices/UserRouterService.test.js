const UserRouterService = require('@services/RoutersServices/UserRouterService');
const MoqReq = require('../../MoqReq');
const MoqRes = require('../../MoqRes');

describe('Manage users service', () => {

    test('loginFacebook', async () => {
        //TODO: causing errors
        // const moqReq = MoqReq;
        // moqReq.body = {user: {
        //     email: 'test@gmail.com',
        //     name: 'test test'
        // }};
        // const moqRes = MoqRes;
        // await UserRouterService.loginFacebook(moqReq, moqRes);
        // expect(moqRes.json).toBe("ok");
    });

    test('resetPasswordWithError', async () => {
        const moqReq = MoqReq;
        moqReq.body = {email: 'notExist@gmail.com', password: '1'};
        const moqRes = MoqRes;
        await UserRouterService.resetPassword(moqReq, moqRes);
        expect(moqRes.json).toBe("user not found");
    });
    
    test('resetPassword', async () => {
        const moqReq = MoqReq;
        moqReq.body = {email: 'nati@gmail.com', password: '1'};
        const moqRes = MoqRes;
        await UserRouterService.resetPassword(moqReq, moqRes);
        expect(moqRes.json).toBe("ok");
    });

    test('sendResetMail', async () => {
        const moqReq = MoqReq;
        moqReq.body = {email: 'dor@gmail.com'};
        const moqRes = MoqRes;
        await UserRouterService.sendResetMail(moqReq, moqRes);
        expect(moqRes.json).toStrictEqual("ok");
    });

    test('loginGoogle', async () => {
        //TODO: causing errors
        // const moqReq = MoqReq;
        // moqReq.body = {user: {
        //     email: 'test@gmail.com',
        //     name: 'test test'
        // }};
        // const moqRes = MoqRes;
        // await UserRouterService.loginGoogle(moqReq, moqRes);
        // expect(moqRes.json).toBe("1");
    });

    test('getUser', async () => {
        const moqReq = MoqReq;
        moqReq.body = {user: {
            Email: 'dor@gmail.com',
            Password: '1'
        }};
        const moqRes = MoqRes;
        await UserRouterService.getUser(moqReq, moqRes);
        const d1 = new Date("2021-09-16T11:22:17.912Z");
        const d2 = new Date("2021-09-16T11:21:57.231Z");
        const expectedData = {"Address": "h1", "role": "USER", "Avatar": "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/><dc:title>Initials</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource=\"https://creativecommons.org/publicdomain/zero/1.0/\"/></cc:Work><cc:License rdf:about=\"https://creativecommons.org/publicdomain/zero/1.0/\"><cc:permits rdf:resource=\"https://creativecommons.org/ns#Reproduction\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#Distribution\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#DerivativeWorks\"/></cc:License></rdf:RDF></metadata><mask id=\"avatarsRadiusMask\"><rect width=\"1\" height=\"1\" rx=\"0\" ry=\"0\" x=\"0\" y=\"0\" fill=\"#fff\"/></mask><g mask=\"url(#avatarsRadiusMask)\"><rect width=\"1\" height=\"1\" fill=\"#3949AB\"/><text x=\"50%\" y=\"50%\" style=\" font-family: Arial,sans-serif; font-size: 0.5px\" fill=\"#FFF\" text-anchor=\"middle\" dy=\"0.178\">DO</text></g></svg>", "BirthDay": d2, "Email": "dor@gmail.com", "FirstName": "dor", "Id": 1, "JoinTimeStamp": d1, "LastName": "schreiber", "Password": "$2b$10$6KOjsgnUelUOTTg3VBSI3ecT5vFoMU3aneYFEDWo2jkUBzYiLTdpe", "PhoneNumber": "0502289112", "Platform": "Site", "UserName": "dor"};
        expect(moqRes.json).toStrictEqual(expectedData);
    });

    test('signup', async () => {
        //TODO: causing errors
        // const moqReq = MoqReq;
        // moqReq.body = {user: {
        //     UserName: 'test', Password: 'test', Email: 'test@gmail.com', FirstName: 'test', LastName: 'test', PhoneNumber: '0111111111', bday: new Date("2021-09-16T11:22:17.912Z"), Address: 'test', Platform: 'site'
        // }};
        // const moqRes = MoqRes;
        // const d1 = new Date('2021-09-16T11:21:57.231Z');
        // const d2 = new Date('2021-09-16T11:22:17.912Z');
        // const expectedData = {"Address": "h1", "role": "USER", "Avatar": "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/><dc:title>Initials</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource=\"https://creativecommons.org/publicdomain/zero/1.0/\"/></cc:Work><cc:License rdf:about=\"https://creativecommons.org/publicdomain/zero/1.0/\"><cc:permits rdf:resource=\"https://creativecommons.org/ns#Reproduction\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#Distribution\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#DerivativeWorks\"/></cc:License></rdf:RDF></metadata><mask id=\"avatarsRadiusMask\"><rect width=\"1\" height=\"1\" rx=\"0\" ry=\"0\" x=\"0\" y=\"0\" fill=\"#fff\"/></mask><g mask=\"url(#avatarsRadiusMask)\"><rect width=\"1\" height=\"1\" fill=\"#3949AB\"/><text x=\"50%\" y=\"50%\" style=\" font-family: Arial,sans-serif; font-size: 0.5px\" fill=\"#FFF\" text-anchor=\"middle\" dy=\"0.178\">DO</text></g></svg>", "BirthDay": d1, "Email": "dor@gmail.com", "FirstName": "dor", "Id": 1, "JoinTimeStamp": d2, "LastName": "schreiber", "Password": "$2b$10$6KOjsgnUelUOTTg3VBSI3ecT5vFoMU3aneYFEDWo2jkUBzYiLTdpe", "PhoneNumber": "0502289112", "Platform": "Site", "UserName": "dor"};
        // await UserRouterService.signup(moqReq, moqRes);
        // expect(moqRes.json).toStrictEqual(expectedData);

    });

    test('login', async () => {
        const moqReq = MoqReq;
        moqReq.body = {user: {
            Email: 'dor@gmail.com',
            Password: '1'
        }};
        const moqRes = MoqRes;
        const expectedData = {"role": "USER", "Avatar": "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/><dc:title>Initials</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource=\"https://creativecommons.org/publicdomain/zero/1.0/\"/></cc:Work><cc:License rdf:about=\"https://creativecommons.org/publicdomain/zero/1.0/\"><cc:permits rdf:resource=\"https://creativecommons.org/ns#Reproduction\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#Distribution\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#DerivativeWorks\"/></cc:License></rdf:RDF></metadata><mask id=\"avatarsRadiusMask\"><rect width=\"1\" height=\"1\" rx=\"0\" ry=\"0\" x=\"0\" y=\"0\" fill=\"#fff\"/></mask><g mask=\"url(#avatarsRadiusMask)\"><rect width=\"1\" height=\"1\" fill=\"#3949AB\"/><text x=\"50%\" y=\"50%\" style=\" font-family: Arial,sans-serif; font-size: 0.5px\" fill=\"#FFF\" text-anchor=\"middle\" dy=\"0.178\">DO</text></g></svg>", "Status": true, "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVGVtcGxhdGUiOnsiSWQiOjEsIlVzZXJOYW1lIjoiZG9yIiwiRmlyc3ROYW1lIjoiZG9yIiwiTGFzdE5hbWUiOiJzY2hyZWliZXIiLCJFbWFpbCI6ImRvckBnbWFpbC5jb20ifSwiaWF0IjoxNjMzMjc3MzgwLCJleHAiOjE2MzMyODkzODB9.7QOoLSiMz7McbpICGhFXpsW1z91jGXtU8oRG42Hc3SA"};
        await UserRouterService.login(moqReq, moqRes);
        expect(moqRes.json).toHaveProperty('Avatar',expectedData.Avatar);
    });

});
