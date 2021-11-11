import SessionStorageService from "Services/SessionServices/SessionStorageServiceSync";
import http from "Services/HttpService/httpService";

const friendProxyService = {
  async getFriends() {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Friends/GetFriends",
    {headers: {'authorization': userSession}});
  },

  async getFriendsByEmail(email) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Friends/GetFriendsByEmail?user=" + email,
    {headers: {'authorization': userSession}});
  },
  

  async getMembers() {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Friends/GetMembers",
    {headers: {'authorization': userSession}});
  },
  
  async getGroups() {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Friends/GetGroups",
    {headers: {'authorization': userSession}});
  },

  async getGroupsByEmail(email) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.get("Friends/GetGroupsByEmail?user=" + email,
    {headers: {'authorization': userSession}});
  },

  

  async createNewGroup(groupData) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    const jsonBody = {group: groupData};
    return await http.post("Friends/CreateNewGroup", jsonBody,
    {headers: {'authorization': userSession}});
  },

  async addFriend(UserData,FriendData) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    const jsonBody = {user: UserData,friend: FriendData};
    return await http.post("Friends/AddFriend", jsonBody,
    {headers: {'authorization': userSession}});
  },

  async removeFriend(groupData) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    const jsonBody = {friend: groupData};
    return await http.post("Friends/RemoveFriend", jsonBody,
    {headers: {'authorization': userSession}});
  },

  async blockFriend(groupData) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    const jsonBody = {friend: groupData};
    return await http.post("Friends/BlockFriend", jsonBody,
    {headers: {'authorization': userSession}});
  },

  async leaveGroup(groupData) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    const jsonBody = {group: groupData};
    return await http.post("Friends/LeaveGroup", jsonBody,
    {headers: {'authorization': userSession}});
  },

  async addFriendToGroup(groupData, userData) {
    const userSession = SessionStorageService.getFromSessionStorage('User');
    const jsonBody = {group: groupData, user: userData};
    return await http.post("Friends/AddFriendToGroup", jsonBody,
    {headers: {'authorization': userSession}});
  },

  
};

export default friendProxyService;
