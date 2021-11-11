const PostRouterService = require('@services/RoutersServices/PostRouterService');
const MoqReq = require('../../MoqReq');
const MoqRes = require('../../MoqRes');

describe('Manage posts service', () => {

    test('CreatePost', async () => {
        // const moqReq = MoqReq;
        // moqReq.body = { 
        //     post: {
        //         UserId: 1 ,Description: 'test', TaggedUsers: [], ImgFile: 'test', Title: 'test', Tags: [], Position: {latitude: 1.11, longitude: 2.22}
        //     }
        // };
        // const moqRes = MoqRes;
        // await PostRouterService.CreatePost(moqReq, moqRes);
        // expect(moqRes.status).toBe(200);
        // expect(moqRes.json).toHaveProperty('Description', 'test');
        // expect(moqRes.json).toHaveProperty('Image', 'test');
        // expect(moqRes.json).toHaveProperty('LocationLan', 2.22);
        // expect(moqRes.json).toHaveProperty('LocationLat', 1.11);
        // expect(moqRes.json).toHaveProperty('Title', 'test');

        //TODO: waiting for remove post so it won fail feed tests
    });

    test('getLikes', async () => {
        const moqReq = MoqReq;
        moqReq.query = {id: 1};
        const moqRes = MoqRes;
        await PostRouterService.getLikes(moqReq, moqRes);
        expect(moqRes.json).toBe("1");
    });

    test('AddLike', async () => {
        const moqReq = MoqReq;
        const moqRes = MoqRes;
        await PostRouterService.AddLike(moqReq, moqRes);
        expect(moqRes.json).toBe("2");
        await PostRouterService.AddLike(moqReq, moqRes);
        expect(moqRes.json).toBe("1");
    });

    test('AddComment', async () => {
        // const moqReq = MoqReq;
        // moqReq.body = {comment: 'test'}
        // const moqRes = MoqRes;
        // await PostRouterService.AddComment(moqReq, moqRes);
        // const d = new Date();
        // const expectData = {"Author": "dor", "Text": "test"};
        // expect(moqRes.json).toHaveProperty('Author',expectData.Author);
        // expect(moqRes.json).toHaveProperty('Text',expectData.Text);

        //TODO: wait for remove comment to be implemented
    });

    test('GetComments', async () => {
        const moqReq = MoqReq;
        moqReq.query = {id: 1};
        const moqRes = MoqRes;
        const d = new Date("2021-09-19T14:05:05.195Z");
        const expectedData = [{"Author": "dor", "Metadata": d, "Text": "Hello!", "avatar": "<svg xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource=\"http://purl.org/dc/dcmitype/StillImage\"/><dc:title>Initials</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource=\"https://creativecommons.org/publicdomain/zero/1.0/\"/></cc:Work><cc:License rdf:about=\"https://creativecommons.org/publicdomain/zero/1.0/\"><cc:permits rdf:resource=\"https://creativecommons.org/ns#Reproduction\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#Distribution\"/><cc:permits rdf:resource=\"https://creativecommons.org/ns#DerivativeWorks\"/></cc:License></rdf:RDF></metadata><mask id=\"avatarsRadiusMask\"><rect width=\"1\" height=\"1\" rx=\"0\" ry=\"0\" x=\"0\" y=\"0\" fill=\"#fff\"/></mask><g mask=\"url(#avatarsRadiusMask)\"><rect width=\"1\" height=\"1\" fill=\"#3949AB\"/><text x=\"50%\" y=\"50%\" style=\" font-family: Arial,sans-serif; font-size: 0.5px\" fill=\"#FFF\" text-anchor=\"middle\" dy=\"0.178\">DO</text></g></svg>"}];
        await PostRouterService.GetComments(moqReq, moqRes);
        expect(moqRes.json).toStrictEqual(expectedData);
    });

    test('GetTaggedUsers', async () => {
        const moqReq = MoqReq;
        moqReq.query = {id: 1};
        const moqRes = MoqRes;
        const expectedData = [{"Id": 1, "PostId": 1, "UserId": 2}];
        await PostRouterService.GetTaggedUsers(moqReq, moqRes);
        expect(moqRes.json).toStrictEqual(expectedData);
    });
    
});
