
const GetTaggedUsers = require('@functions/Routers/post/getTaggedUsers');
const GetComments = require('@functions/Routers/post/getComments');
const CreatePost = require('@functions/Elastic/Post/CreateFunc');
const AddComment = require('@functions/Routers/post/addComment');
const DeletePost = require('@functions/Routers/post/removePost');
const editPost = require('@functions/Routers/post/editPost');
const getLikes = require('@functions/Routers/post/getLikes');
const AddLike = require('@functions/Routers/post/addLike');
const getTags = require('@functions/Routers/post/getTags');
const getAllTags = require('@functions/Routers/post/getAllTags');
const GetPost = require('@functions/Elastic/post/GetByIdFunc');
const UpdateFunc = require('@functions/Elastic/Post/UpdateFunc');

class PostRouterService {
    static GetPost = (req, res) => GetPost(req, res);
    static GetTaggedUsers = (req, res) => GetTaggedUsers(req, res);
    static GetComments = (req, res) => GetComments(req, res);
    static CreatePost = (req, res) => CreatePost(req, res);
    static AddComment = (req, res) => AddComment(req, res);
    static editPost = (req, res) => editPost(req, res);
    static getLikes = (req, res) => getLikes(req, res);
    static AddLike = (req, res) => AddLike(req, res);
    static deletePost = (req, res) => DeletePost(req, res);
    static getTags = (req, res) => getTags(req, res);
    static getAllTags = (req, res) => getAllTags(req, res);
    static UpdateFunc = (req, res) => UpdateFunc(req, res);
}

module.exports = PostRouterService;