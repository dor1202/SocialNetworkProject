import SessionStorageService from "Services/SessionServices/SessionStorageServiceSync";
import http from "Services/HttpService/httpService";

const userProxyService = {

  async loginGoogle(userData) {
    const jsonBody = {user: userData};
    return await http.post("Users/loginGoogle", jsonBody);
  },

  async loginFacebook(userData) {
    const jsonBody = {user: userData};
    return await http.post("Users/loginFacebook", jsonBody);
  },

  async checkIfUserIsValidWithPassword(userData) {
    const jsonBody = {user: userData};
    return await http.post("Users/isValidWithPassword", jsonBody);
  },

  async loginUser(userData) {
    const jsonBody = {user: userData};
    return await http.post("Users/login", jsonBody);
  },

  async createNewUser(userData) {
    const jsonBody = {user: userData};
    return await http.post("Users/createUser", jsonBody);
  },

  async ResetPasswordMail(userEmail) {
    const jsonBody = {email: userEmail};
    return await http.post("Users/ResetPasswordMail", jsonBody);
  },

  async ResetPassword(userEmail, newPassword) {
    const jsonBody = {email: userEmail, password: newPassword};
    return await http.post("Users/ResetPassword", jsonBody);
  },

  async getUser(userId) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Users/GetUser?user=" + userId,
    {headers: {'authorization': userSession}});
  },

  async getUserByEmail(userMail) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Users/GetUserByMail?user=" + userMail,
    {headers: {'authorization': userSession}});
  },
  

  async getNotifications() {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Users/GetNotifications",
    {headers: {'authorization': userSession}});
  },

  async getUserImages() {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Users/GetUserImages",
    {headers: {'authorization': userSession}});
  },

  async getUserImagesByEmail(userMail) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Users/GetUserImagesByEmail?user=" + userMail,
    {headers: {'authorization': userSession}});
  }

  
};

export default userProxyService;
