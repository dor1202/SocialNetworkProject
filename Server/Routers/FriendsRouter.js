
const LoginAuthentication = require('@middleware/AuthenticationService').LoginAuthentication;
const FriendsRouterService = require('@services/RoutersServices/FriendsRouterService');
const express = require("express");
const router = express.Router();

// Requests

router.get('/GetGroupsByEmail', LoginAuthentication, FriendsRouterService.GetGroupsByEmail);
router.get('/GetFriendsByEmail', LoginAuthentication, FriendsRouterService.GetFriendsByEmail);
router.post('/AddFriendToGroup', LoginAuthentication, FriendsRouterService.addFriendToGroup);
router.post('/CreateNewGroup', LoginAuthentication, FriendsRouterService.createNewGroup);
router.post('/RemoveFriend', LoginAuthentication, FriendsRouterService.removeFriend);
router.post('/BlockFriend', LoginAuthentication, FriendsRouterService.blockFriend);
router.post('/LeaveGroup', LoginAuthentication, FriendsRouterService.leaveGroup);
router.post('/AddFriend', LoginAuthentication, FriendsRouterService.addFriend);
router.get('/GetFriends', LoginAuthentication, FriendsRouterService.getFriends);
router.get('/GetMembers', LoginAuthentication, FriendsRouterService.getMembers);
router.get('/GetGroups', LoginAuthentication, FriendsRouterService.getGroups);

module.exports = router;