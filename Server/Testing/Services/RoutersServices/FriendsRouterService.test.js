const FriendsRouterService = require('@services/RoutersServices/FriendsRouterService');
const MoqReq = require('../../MoqReq');
const MoqRes = require('../../MoqRes');

describe('Manage friends in service', () => {

    test('addFriend', async () => {
        const moqReq = MoqReq;
        moqReq.body = { user: { Id: 1 }, friend: 2 };
        const moqRes = MoqRes;
        await FriendsRouterService.addFriend(moqReq, moqRes);
        expect(moqRes.status).toBe(200);
        expect(moqRes.json).toStrictEqual("ok");
    });

    test('blockFriend', async () => {
        const moqReq = MoqReq;
        moqReq.body = { friend: 2 };
        const moqRes = MoqRes;
        await FriendsRouterService.blockFriend(moqReq, moqRes);
        expect(moqRes.status).toBe(200);
        expect(moqRes.json).toStrictEqual("updated");
    });

    test('removeFriend', async () => {
        const moqReq = MoqReq;
        moqReq.body = { friend: 2 };
        const moqRes = MoqRes;
        await FriendsRouterService.removeFriend(moqReq, moqRes);
        expect(moqRes.status).toBe(200);
        expect(moqRes.json).toStrictEqual("deleted");
    });
    
    test('getFriends', async () => {
        const moqReq = MoqReq;
        const moqRes = MoqRes;
        const expectData = [{"id": 2, "image": "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/><dc:title>Initials</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource=\"https://creativecommons.org/publicdomain/zero/1.0/\"/></cc:Work><cc:License rdf:about=\"https://creativecommons.org/publicdomain/zero/1.0/\"><cc:permits rdf:resource=\"https://creativecommons.org/ns#Reproduction\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#Distribution\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#DerivativeWorks\"/></cc:License></rdf:RDF></metadata><mask id=\"avatarsRadiusMask\"><rect width=\"1\" height=\"1\" rx=\"0\" ry=\"0\" x=\"0\" y=\"0\" fill=\"#fff\"/></mask><g mask=\"url(#avatarsRadiusMask)\"><rect width=\"1\" height=\"1\" fill=\"#3949AB\"/><text x=\"50%\" y=\"50%\" style=\" font-family: Arial,sans-serif; font-size: 0.5px\" fill=\"#FFF\" text-anchor=\"middle\" dy=\"0.178\">DO</text></g></svg>", "isBlocked": false, "userName": "nati"}];
        await FriendsRouterService.getFriends(moqReq, moqRes);
        expect(moqRes.status).toBe(200);
        expect(moqRes.json).toStrictEqual(expectData);
    });

});

describe('Manage groups in service', () => {

    test('getGroups', async () => {
        const moqReq = MoqReq;
        const moqRes = MoqRes;
        const expectedData = [{"friends": [{"id": undefined, "image": "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/><dc:title>Initials</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource=\"https://creativecommons.org/publicdomain/zero/1.0/\"/></cc:Work><cc:License rdf:about=\"https://creativecommons.org/publicdomain/zero/1.0/\"><cc:permits rdf:resource=\"https://creativecommons.org/ns#Reproduction\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#Distribution\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#DerivativeWorks\"/></cc:License></rdf:RDF></metadata><mask id=\"avatarsRadiusMask\"><rect width=\"1\" height=\"1\" rx=\"0\" ry=\"0\" x=\"0\" y=\"0\" fill=\"#fff\"/></mask><g mask=\"url(#avatarsRadiusMask)\"><rect width=\"1\" height=\"1\" fill=\"#3949AB\"/><text x=\"50%\" y=\"50%\" style=\" font-family: Arial,sans-serif; font-size: 0.5px\" fill=\"#FFF\" text-anchor=\"middle\" dy=\"0.178\">DO</text></g></svg>", "userName": "nati"}], "groupName": "testGroup", "id": 1}];
        await FriendsRouterService.getGroups(moqReq, moqRes);
        expect(moqRes.status).toBe(200);
        expect(moqRes.json).toStrictEqual(expectedData);
    });

    test('createNewGroup', async () => {
        const moqReq = MoqReq;
        moqReq.body = {group: 'test'};
        const moqRes = MoqRes;
        const expectedData = {"friends": [], "groupName": "test"};
        await FriendsRouterService.createNewGroup(moqReq, moqRes);
        expect(moqRes.status).toBe(200);
        expect(moqRes.json).toHaveProperty('friends',expectedData.friends);
        expect(moqRes.json).toHaveProperty('groupName',expectedData.groupName);
    });

    // test('addFriendToGroup', async () => {
    //     const moqReq = MoqReq;
    //     moqReq.body = {group: {id: 1, groupName: 'test'}, user: {userName: 'shaked', id: 3, image: ''}};
    //     const moqRes = MoqRes;
    //     const expectedData = {"alreadyExist": true, "groupName": "test", "id": 1, "newFriend": {"id": 3, "image": "", "userName": "shaked"}};
    //     await FriendsRouterService.addFriendToGroup(moqReq, moqRes);
    //     expect(moqRes.status).toBe(200);
    //     expect(moqRes.json).toStrictEqual(expectedData);
    // });

    test('getMembers', async () => {
        const moqReq = MoqReq;
        const moqRes = MoqRes;
        const expectData = [{"image": {"avatar": true, "src": "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/><dc:title>Initials</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource=\"https://creativecommons.org/publicdomain/zero/1.0/\"/></cc:Work><cc:License rdf:about=\"https://creativecommons.org/publicdomain/zero/1.0/\"><cc:permits rdf:resource=\"https://creativecommons.org/ns#Reproduction\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#Distribution\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#DerivativeWorks\"/></cc:License></rdf:RDF></metadata><mask id=\"avatarsRadiusMask\"><rect width=\"1\" height=\"1\" rx=\"0\" ry=\"0\" x=\"0\" y=\"0\" fill=\"#fff\"/></mask><g mask=\"url(#avatarsRadiusMask)\"><rect width=\"1\" height=\"1\" fill=\"#3949AB\"/><text x=\"50%\" y=\"50%\" style=\" font-family: Arial,sans-serif; font-size: 0.5px\" fill=\"#FFF\" text-anchor=\"middle\" dy=\"0.178\">DO</text></g></svg>"}, "key": "dor", "text": "dor", "value": 1}, {"image": {"avatar": true, "src": "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/><dc:title>Initials</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource=\"https://creativecommons.org/publicdomain/zero/1.0/\"/></cc:Work><cc:License rdf:about=\"https://creativecommons.org/publicdomain/zero/1.0/\"><cc:permits rdf:resource=\"https://creativecommons.org/ns#Reproduction\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#Distribution\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#DerivativeWorks\"/></cc:License></rdf:RDF></metadata><mask id=\"avatarsRadiusMask\"><rect width=\"1\" height=\"1\" rx=\"0\" ry=\"0\" x=\"0\" y=\"0\" fill=\"#fff\"/></mask><g mask=\"url(#avatarsRadiusMask)\"><rect width=\"1\" height=\"1\" fill=\"#3949AB\"/><text x=\"50%\" y=\"50%\" style=\" font-family: Arial,sans-serif; font-size: 0.5px\" fill=\"#FFF\" text-anchor=\"middle\" dy=\"0.178\">DO</text></g></svg>"}, "key": "nati", "text": "nati", "value": 2}, {"image": {"avatar": true, "src": "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/><dc:title>Initials</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource=\"https://creativecommons.org/publicdomain/zero/1.0/\"/></cc:Work><cc:License rdf:about=\"https://creativecommons.org/publicdomain/zero/1.0/\"><cc:permits rdf:resource=\"https://creativecommons.org/ns#Reproduction\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#Distribution\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#DerivativeWorks\"/></cc:License></rdf:RDF></metadata><mask id=\"avatarsRadiusMask\"><rect width=\"1\" height=\"1\" rx=\"0\" ry=\"0\" x=\"0\" y=\"0\" fill=\"#fff\"/></mask><g mask=\"url(#avatarsRadiusMask)\"><rect width=\"1\" height=\"1\" fill=\"#3949AB\"/><text x=\"50%\" y=\"50%\" style=\" font-family: Arial,sans-serif; font-size: 0.5px\" fill=\"#FFF\" text-anchor=\"middle\" dy=\"0.178\">DO</text></g></svg>"}, "key": "shaked", "text": "shaked", "value": 3}];
        await FriendsRouterService.getMembers(moqReq, moqRes);
        expect(moqRes.status).toBe(200);
        expect(moqRes.json).toStrictEqual(expectData);
    });

    test('leaveGroup', async () => {
        // remove exist friend
        const moqReq = MoqReq;
        const moqRes = MoqRes;
        await FriendsRouterService.getGroups(moqReq, moqRes);
        moqReq.body = {group: MoqRes.json[1].id};
        await FriendsRouterService.leaveGroup(moqReq, moqRes);
        expect(moqRes.status).toBe(200);
        expect(moqRes.json).toStrictEqual("deleted");
    });
    
});
