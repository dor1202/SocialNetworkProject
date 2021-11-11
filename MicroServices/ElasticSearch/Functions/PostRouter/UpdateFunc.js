
const ElasticService = require('@Services/ElasticService');
const client = ElasticService.client;
const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');

async function UpdateFunc(req, res) {
    const { PostId, UserId, Title,ImgFile,Description,IsPublic,TaggedUsers,Tags } = req.body.post;
    const {latitude,longitude} = req.body.post.Position

    const {body} = await client.update({
        index: 'post',
        id: PostId,
        body: {
            doc: {
                UserId: UserId,
                Title:Title,
                Image:ImgFile,
                Description:Description,
                LocationLat:latitude,
                LocationLan:longitude,
                IsPublic:IsPublic,
                isAlive: true
            }
        }
    })
    for (let index = 0; index < TaggedUsers.id.length; index++) {
        const [r, e1] = await AwaitHandling(axios.SqlRequest.post('Posts/AddTaggedUser',  {UserId: TaggedUsers.id[index], PostId: PostId}));
    }
    for (let index = 0; index < Tags.length; index++) {
        let dbElement = {};
        const [a, e2] = await AwaitHandling(axios.SqlRequest.post('Posts/FindTag',  {Text: Tags[index].text}));
        dbElement = a.data;
        if (dbElement == '') {
            const [b, e3] = await AwaitHandling(axios.SqlRequest.post('Posts/AddTags',  {Text: Tags[index].text}));
            dbElement = b.data;
        }
        const [c, e4] = await AwaitHandling(axios.SqlRequest.post('Posts/AddTagToPost',  {PostId: PostId, TagsId: dbElement.Id}));
    }
    res.send('updated');
}

module.exports = UpdateFunc;