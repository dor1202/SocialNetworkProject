
import SessionStorageService from "Services/SessionServices/SessionStorageServiceSync";
import http from "Services/HttpService/httpService";

const postProxyService = {
  async createNewPost(userData) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    const jsonBody = {post: userData};
    return await http.post("Posts/CreatePost", jsonBody,
    {headers: {'authorization': userSession}});
  },

  async updatePost(userData) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    const jsonBody = {post: userData};
    return await http.post("Posts/EditPost", jsonBody,
    {headers: {'authorization': userSession}});
  },

  async getComments(postId) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Posts/GetComments?id=" + postId,
    {headers: {'authorization': userSession}});
  },

  async getTaggedUsers(postId) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Posts/GetTaggedUsers?id=" + postId,
    {headers: {'authorization': userSession}});
  },

  async getLikesInPost(postId) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Posts/GetLikes?id=" + postId,
    {headers: {'authorization': userSession}});
  },

  async getPost(postId) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Posts/GetPost?id=" + postId,
    {headers: {'authorization': userSession}});
  },

  async addLike(postId) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Posts/AddLike?id=" + postId,
    {headers: {'authorization': userSession}});
  },
  
  async deletePost(postId) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Posts/DeletePost?id=" + postId,
    {headers: {'authorization': userSession}});
  },

  async addComment(commentData, postId) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    const jsonBody = {comment: commentData};
    return await http.post("Posts/AddComment?id=" + postId, jsonBody,
    {headers: {'authorization': userSession}});
  },
  
  async getTagsInPost(postId) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.post("Posts/GetTags?id=" + postId,
    {headers: {'authorization': userSession}});
  },

  async getAllTags() {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.post("Posts/GetAllTags",
    {headers: {'authorization': userSession}});
  },
  
};

export default postProxyService;
