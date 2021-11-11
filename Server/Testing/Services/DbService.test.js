const DbService = require('@services/DbService');
const { PrismaClient } = require('@prisma/client');

describe('Manage sql', () => {

    test('FindFirst', async () => {
        const res = await DbService.FindFirst('user', 'Id', 1);
        const expectData = {"role": "USER", "Address": "h1", "Avatar": "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/><dc:title>Initials</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource=\"https://creativecommons.org/publicdomain/zero/1.0/\"/></cc:Work><cc:License rdf:about=\"https://creativecommons.org/publicdomain/zero/1.0/\"><cc:permits rdf:resource=\"https://creativecommons.org/ns#Reproduction\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#Distribution\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#DerivativeWorks\"/></cc:License></rdf:RDF></metadata><mask id=\"avatarsRadiusMask\"><rect width=\"1\" height=\"1\" rx=\"0\" ry=\"0\" x=\"0\" y=\"0\" fill=\"#fff\"/></mask><g mask=\"url(#avatarsRadiusMask)\"><rect width=\"1\" height=\"1\" fill=\"#3949AB\"/><text x=\"50%\" y=\"50%\" style=\" font-family: Arial,sans-serif; font-size: 0.5px\" fill=\"#FFF\" text-anchor=\"middle\" dy=\"0.178\">DO</text></g></svg>", "BirthDay": new Date("2021-09-16T11:21:57.231Z"), "Email": "dor@gmail.com", "FirstName": "dor", "Id": 1, "JoinTimeStamp": new Date("2021-09-16T11:22:17.912Z"), "LastName": "schreiber", "Password": "$2b$10$6KOjsgnUelUOTTg3VBSI3ecT5vFoMU3aneYFEDWo2jkUBzYiLTdpe", "PhoneNumber": "0502289112", "Platform": "Site", "UserName": "dor"};
        expect(res).toStrictEqual(expectData);
    });

    test('FindAll', async () => {
        const res = await DbService.FindAll('user', 'Id', 1);
        const expectData = [{"role": "USER", "Address": "h1", "Avatar": "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/><dc:title>Initials</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource=\"https://creativecommons.org/publicdomain/zero/1.0/\"/></cc:Work><cc:License rdf:about=\"https://creativecommons.org/publicdomain/zero/1.0/\"><cc:permits rdf:resource=\"https://creativecommons.org/ns#Reproduction\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#Distribution\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#DerivativeWorks\"/></cc:License></rdf:RDF></metadata><mask id=\"avatarsRadiusMask\"><rect width=\"1\" height=\"1\" rx=\"0\" ry=\"0\" x=\"0\" y=\"0\" fill=\"#fff\"/></mask><g mask=\"url(#avatarsRadiusMask)\"><rect width=\"1\" height=\"1\" fill=\"#3949AB\"/><text x=\"50%\" y=\"50%\" style=\" font-family: Arial,sans-serif; font-size: 0.5px\" fill=\"#FFF\" text-anchor=\"middle\" dy=\"0.178\">DO</text></g></svg>", "BirthDay": new Date("2021-09-16T11:21:57.231Z"), "Email": "dor@gmail.com", "FirstName": "dor", "Id": 1, "JoinTimeStamp": new Date("2021-09-16T11:22:17.912Z"), "LastName": "schreiber", "Password": "$2b$10$6KOjsgnUelUOTTg3VBSI3ecT5vFoMU3aneYFEDWo2jkUBzYiLTdpe", "PhoneNumber": "0502289112", "Platform": "Site", "UserName": "dor"}];
        expect(res).toStrictEqual(expectData);
    });

    test('AddDataToDb', async () => {
        const currentUserData = { UserName: 'test', Password: '123', Email: 'test@gmail.com', FirstName: 'firstTest', LastName: 'lastTest', Avatar: 'svgTest', PhoneNumber: '0428876445', BirthDay: new Date('2021-09-16T11:21:57.231Z'), Address: 'test', Platform: 'site' };
        const res = await DbService.AddDataToDb('user', currentUserData);
        expect(res).toHaveProperty('Address',currentUserData.Address);
        expect(res).toHaveProperty('Avatar',currentUserData.Avatar);
        expect(res).toHaveProperty('BirthDay',currentUserData.BirthDay);
        expect(res).toHaveProperty('Email',currentUserData.Email);
        expect(res).toHaveProperty('FirstName',currentUserData.FirstName);
        expect(res).toHaveProperty('LastName',currentUserData.LastName);
        expect(res).toHaveProperty('Password',currentUserData.Password);
        expect(res).toHaveProperty('PhoneNumber',currentUserData.PhoneNumber);
        expect(res).toHaveProperty('Platform',currentUserData.Platform);
        expect(res).toHaveProperty('UserName',currentUserData.UserName);
    });

    test('UpdateData', async () => {
        const res = await DbService.UpdateData('user', 'Email', 'test@gmail.com', {FirstName: 'test2'});
        const expectedData = {"Address": "test", "Avatar": "svgTest", "BirthDay": new Date("2021-09-16T11:21:57.231Z"), "Email": "test@gmail.com", "FirstName": "test2", "LastName": "lastTest", "Password": "123", "PhoneNumber": "0428876445", "Platform": "site", "UserName": "test"};
        expect(res).toHaveProperty('Address',expectedData.Address);
        expect(res).toHaveProperty('Avatar',expectedData.Avatar);
        expect(res).toHaveProperty('BirthDay',expectedData.BirthDay);
        expect(res).toHaveProperty('Email',expectedData.Email);
        expect(res).toHaveProperty('FirstName',expectedData.FirstName);
        expect(res).toHaveProperty('LastName',expectedData.LastName);
        expect(res).toHaveProperty('Password',expectedData.Password);
        expect(res).toHaveProperty('PhoneNumber',expectedData.PhoneNumber);
        expect(res).toHaveProperty('Platform',expectedData.Platform);
        expect(res).toHaveProperty('UserName',expectedData.UserName);
    });

    test('DeleteElement', async () => {
        const res = await DbService.DeleteElement('user', 'Email', 'test@gmail.com');
        const expectedData = {"Address": "test", "Avatar": "svgTest", "BirthDay": new Date("2021-09-16T11:21:57.231Z"), "Email": "test@gmail.com", "FirstName": "test2", "LastName": "lastTest", "Password": "123", "PhoneNumber": "0428876445", "Platform": "site", "UserName": "test"};
        expect(res).toHaveProperty('Address',expectedData.Address);
        expect(res).toHaveProperty('Avatar',expectedData.Avatar);
        expect(res).toHaveProperty('BirthDay',expectedData.BirthDay);
        expect(res).toHaveProperty('Email',expectedData.Email);
        expect(res).toHaveProperty('FirstName',expectedData.FirstName);
        expect(res).toHaveProperty('LastName',expectedData.LastName);
        expect(res).toHaveProperty('Password',expectedData.Password);
        expect(res).toHaveProperty('PhoneNumber',expectedData.PhoneNumber);
        expect(res).toHaveProperty('Platform',expectedData.Platform);
        expect(res).toHaveProperty('UserName',expectedData.UserName);
    });

    test('FindGroupBy', async () => {
        const res = await DbService.FindGroupBy('user', ["Id","UserName","Avatar"]);
        const expectData = [{"Avatar": "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/><dc:title>Initials</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource=\"https://creativecommons.org/publicdomain/zero/1.0/\"/></cc:Work><cc:License rdf:about=\"https://creativecommons.org/publicdomain/zero/1.0/\"><cc:permits rdf:resource=\"https://creativecommons.org/ns#Reproduction\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#Distribution\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#DerivativeWorks\"/></cc:License></rdf:RDF></metadata><mask id=\"avatarsRadiusMask\"><rect width=\"1\" height=\"1\" rx=\"0\" ry=\"0\" x=\"0\" y=\"0\" fill=\"#fff\"/></mask><g mask=\"url(#avatarsRadiusMask)\"><rect width=\"1\" height=\"1\" fill=\"#3949AB\"/><text x=\"50%\" y=\"50%\" style=\" font-family: Arial,sans-serif; font-size: 0.5px\" fill=\"#FFF\" text-anchor=\"middle\" dy=\"0.178\">DO</text></g></svg>", "Id": 1, "UserName": "dor"}, {"Avatar": "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/><dc:title>Initials</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource=\"https://creativecommons.org/publicdomain/zero/1.0/\"/></cc:Work><cc:License rdf:about=\"https://creativecommons.org/publicdomain/zero/1.0/\"><cc:permits rdf:resource=\"https://creativecommons.org/ns#Reproduction\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#Distribution\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#DerivativeWorks\"/></cc:License></rdf:RDF></metadata><mask id=\"avatarsRadiusMask\"><rect width=\"1\" height=\"1\" rx=\"0\" ry=\"0\" x=\"0\" y=\"0\" fill=\"#fff\"/></mask><g mask=\"url(#avatarsRadiusMask)\"><rect width=\"1\" height=\"1\" fill=\"#3949AB\"/><text x=\"50%\" y=\"50%\" style=\" font-family: Arial,sans-serif; font-size: 0.5px\" fill=\"#FFF\" text-anchor=\"middle\" dy=\"0.178\">DO</text></g></svg>", "Id": 2, "UserName": "nati"}, {"Avatar": "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/><dc:title>Initials</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource=\"https://creativecommons.org/publicdomain/zero/1.0/\"/></cc:Work><cc:License rdf:about=\"https://creativecommons.org/publicdomain/zero/1.0/\"><cc:permits rdf:resource=\"https://creativecommons.org/ns#Reproduction\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#Distribution\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#DerivativeWorks\"/></cc:License></rdf:RDF></metadata><mask id=\"avatarsRadiusMask\"><rect width=\"1\" height=\"1\" rx=\"0\" ry=\"0\" x=\"0\" y=\"0\" fill=\"#fff\"/></mask><g mask=\"url(#avatarsRadiusMask)\"><rect width=\"1\" height=\"1\" fill=\"#3949AB\"/><text x=\"50%\" y=\"50%\" style=\" font-family: Arial,sans-serif; font-size: 0.5px\" fill=\"#FFF\" text-anchor=\"middle\" dy=\"0.178\">DO</text></g></svg>", "Id": 3, "UserName": "shaked"}];
        expect(res).toStrictEqual(expectData);
    });

    test('GetAllData', async () => {
        const res = await DbService.GetAllData('user');
        expect(res).toBeDefined();
    });

    test('GetPrismaClient', () => {
        const prismaClient = DbService.GetPrismaClient();
        expect(prismaClient).toBeInstanceOf(PrismaClient);
    });
});
