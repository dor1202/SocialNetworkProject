
const ElasticService = require('@Services/ElasticService');
const client = ElasticService.client;
const Post = require('@Models/Post');
const Axios = require('@Services/AxiosService');
const axios = new Axios();
const AwaitHandling = require('@Services/AwaitHandling');

async function CreateFunc(req, res) {
    const { UserId, Description, TaggedUsers, ImgFile, Title, Tags, Position, IsPublic} = req.body.post;
    const {latitude, longitude,} = req.body.post.Position;
    const LocationLat = latitude;
    const LocationLan = longitude;
    const Image = req.body.post.ImgFile;
    const postElement = Post(UserId, Title, Image, Description, LocationLat, LocationLan, new Date().toDateString(), IsPublic);
    let postElementUserId = req.body.post.UserId;
    let postElementIsPublic = req.body.post.IsPublic;
    let element = await client.index({
        index: 'post',
        body: postElement
    })
    for (let index = 0; index < TaggedUsers.Id.length; index++) {
        const [r, e1] = await AwaitHandling(axios.SqlRequest.post('Posts/AddTaggedUser',  {UserId: TaggedUsers.Id[index], PostId: element.body._id}));
    }
    for (let index = 0; index < Tags.length; index++) {
        let dbElement = {};
        const [a, e2] = await AwaitHandling(axios.SqlRequest.post('Posts/FindTag',  {Text: Tags[index].text}));
        dbElement = a.data;
        if (dbElement == '') {
            const [b, e3] = await AwaitHandling(axios.SqlRequest.post('Posts/AddTags',  {Text: Tags[index].text}));
            dbElement = b.data;
        }
        const [c, e4] = await AwaitHandling(axios.SqlRequest.post('Posts/AddTagToPost',  {PostId: element.body._id, TagsId: dbElement.Id}));
    }
    res.send({element,postElementUserId,postElementIsPublic});
}

module.exports = CreateFunc;