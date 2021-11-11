
const FriendsRouterService = require('@services/RoutersServices/FriendsRouterService');
const express = require("express");
const router = express.Router();

// Requests

router.get('/GetFriendOfAFriend', FriendsRouterService.GetFriendOfAFriend);
router.get('/GetGroupToUser', FriendsRouterService.GetGroupToUser);
router.get('/GetUnBlockedFriends', FriendsRouterService.GetUnBlockedFriends);
router.get('/GetGroupsByEmail', FriendsRouterService.GetGroupsByEmail);
router.get('/GetFriendsByEmail', FriendsRouterService.GetFriendsByEmail);
router.post('/AddFriendToGroup', FriendsRouterService.addFriendToGroup);
router.post('/CreateNewGroup', FriendsRouterService.createNewGroup);
router.post('/RemoveFriend', FriendsRouterService.removeFriend);
router.post('/BlockFriend', FriendsRouterService.blockFriend);
router.post('/LeaveGroup', FriendsRouterService.leaveGroup);
router.post('/AddFriend', FriendsRouterService.addFriend);
router.get('/GetFriends', FriendsRouterService.getFriends);
router.get('/GetMembers', FriendsRouterService.getMembers);
router.get('/GetGroups', FriendsRouterService.getGroups);

module.exports = router;