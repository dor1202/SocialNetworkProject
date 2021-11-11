
const GetTaggedUsers = require('@functions/Routers/post/getTaggedUsers');
const GetComments = require('@functions/Routers/post/getComments');
const AddComment = require('@functions/Routers/post/addComment');
const getLikes = require('@functions/Routers/post/getLikes');
const AddLike = require('@functions/Routers/post/addLike');
const getTags = require('@functions/Routers/post/getTags');
const getAllTags = require('@functions/Routers/post/getAllTags');
const CreatePostTo = require('@functions/Routers/ElasticRouters/connectPostToSql');
const AddTaggedUser = require('@functions/Routers/post/addTaggedUser')
const AddTags = require('@functions/Routers/post/AddTags')
const FindTag = require('@functions/Routers/post/FindTag')
const AddTagToPost = require('@functions/Routers/post/AddTagToPost')

class PostRouterService {
    static AddTagToPost = (req, res) => AddTagToPost(req, res);
    static FindTag = (req, res) => FindTag(req, res);
    static AddTags = (req, res) => AddTags(req, res);
    static AddTaggedUser = (req, res) => AddTaggedUser(req, res);
    static GetTaggedUsers = (req, res) => GetTaggedUsers(req, res);
    static GetComments = (req, res) => GetComments(req, res);
    static AddComment = (req, res) => AddComment(req, res);
    static getLikes = (req, res) => getLikes(req, res);
    static AddLike = (req, res) => AddLike(req, res);
    static getTags = (req, res) => getTags(req, res);
    static getAllTags = (req, res) => getAllTags(req, res);
    static CreatePostTo = (req, res) => CreatePostTo(req, res);
}

module.exports = PostRouterService;