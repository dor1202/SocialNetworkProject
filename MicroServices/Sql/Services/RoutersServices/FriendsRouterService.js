const addFriendToGroup = require('@functions/Routers/Friend/addFriendToGroup');
const createNewGroup = require('@functions/Routers/Friend/createNewGroup');
const removeFriend = require('@functions/Routers/Friend/removeFriend');
const blockFriend = require('@functions/Routers/Friend/blockFriend');
const getFriends = require('@functions/Routers/Friend/getFriends');
const leaveGroup = require('@functions/Routers/Friend/leaveGroup');
const getMembers = require('@functions/Routers/Friend/getMembers');
const addFriend = require('@functions/Routers/Friend/addFriend');
const getGroups = require('@functions/Routers/Friend/getGroups');
const GetFriendsByEmail = require('@functions/Routers/Friend/GetFriendsByEmail');
const GetGroupsByEmail = require('@functions/Routers/Friend/GetGroupsByEmail');
const GetUnBlockedFriends = require('@functions/Routers/Friend/getUnBlockedFriends');
const GetGroupToUser = require('@functions/Routers/Friend/getGroupToUser');
const GetFriendOfAFriend = require('@functions/Routers/Friend/getFriendOfAFriend');

class FriendsRouterService {
    
    static GetFriendOfAFriend = (req,res) => GetFriendOfAFriend(req,res);
    static GetGroupToUser = (req,res) => GetGroupToUser(req,res);
    static GetUnBlockedFriends = (req,res) => GetUnBlockedFriends(req,res);
    static GetGroupsByEmail = (req,res) => GetGroupsByEmail(req,res);
    static GetFriendsByEmail = (req,res) => GetFriendsByEmail(req,res);
    static addFriendToGroup = (req,res) => addFriendToGroup(req,res);
    static createNewGroup = (req,res) => createNewGroup(req,res);
    static removeFriend = (req,res) => removeFriend(req,res);
    static blockFriend = (req,res) => blockFriend(req,res);
    static getFriends = (req,res) => getFriends(req,res);
    static getMembers = (req,res) => getMembers(req,res);
    static leaveGroup = (req,res) => leaveGroup(req,res);
    static addFriend = (req,res) => addFriend(req,res);
    static getGroups = (req,res) => getGroups(req,res);
}

module.exports = FriendsRouterService;