import SessionStorageServiceSync from "Services/SessionServices/SessionStorageServiceSync";
import InvalidTokenPopup from "Components/InvalidTokenPopup/InvalidTokenPopup";
import friendProxyService from "Services/ProxyServices/friendProxyService";
import AddFriendForm from "Components/Forms/AddFriendForm/AddFriendForm";
import AddGroupForm from "Components/Forms/AddGroupForm/AddGroupForm";
import userViewFunctions from "./UserViewFunctions";
import React, { useEffect, useState } from "react";
import Friends from "Components/User/Friends/Friends";
import Profile from "Components/User/Profile/Profile";
import Groups from "Components/User/Groups/Groups";
import Popup from "Components/Popup/Popup";
import { useHistory } from "react-router";
import { Grid } from "semantic-ui-react";
import './UserView.css';
import SideNav from "Components/Navs/SideNav/SideNav";
import FillPopupService from "Services/FillPopupService/FillPopupService";
import AwaitHandling from "Services/AwaitHandling/AwaitHandling";
import SocketService from "Services/SocketService/SocketService";
import friendSocketService from "Services/SocketService/Sockets/friendSocketService";
import userProxyService from "Services/ProxyServices/userProxyService";
import NormalFeedElement from "Components/Feed/NormalFeed/NormalFeedElement/NormalFeedElement";
import postProxyService from "Services/ProxyServices/postProxyService";
import SmallDate from "Components/Pipes/SmallDate";
import ProfileFeedElement from "Components/Feed/ProfileFeedElement/ProfileFeedElement";
import EditPost from "Components/Forms/EditPost/EditPost";

const UserView = () => {

    // State
    const [CurrentPopupForm, setCurrentPopupForm] = useState(<div></div>);
    const [OpenBeforeTestPop, setOpenBeforeTestPop] = useState(false);
    const [PopupHeader, setPopupHeader] = useState('');
    const [FriendsArray, setFriendsArray] = useState([{ id: '', userName: '', image: '', isBlocked: false }]);
    const [User, setUser] = useState({Id: '' , UserName: '', Avatar: '' });
    const [UserImages, setUserImages] = useState([]);
    const [GroupsArray, setGroupsArray] = useState([{ id: '', groupName: '', friends: [] }]);
    const history = useHistory();
    const [CurrentPickedUser, setCurrentPickedUser] = useState({});
    const [Notifications, setNotifications] = useState([]);
    const [CurrenPost, setCurrentPost] = useState({});

    // Functions
    useEffect(() => {
        async function initData() {
            const userSession = SessionStorageServiceSync.getFromSessionStorage('User');
            const user = userViewFunctions.getUser(userSession);
            if(user !== undefined) setUser(user);
            const [userImages, userImagesError] = await AwaitHandling(userProxyService.getUserImages());
            if(!userImagesError) setUserImages(userImages.data);
            const [friends, friendsError] = await AwaitHandling(friendProxyService.getFriends());
            if(!friendsError) setFriendsArray(friends.data);
            const [groups, groupsError] = await AwaitHandling(friendProxyService.getGroups());
            if(!groupsError) setGroupsArray(groups.data);
            const [notifications, notificationsError] = await AwaitHandling(userProxyService.getNotifications());
            if(!notificationsError) setNotifications(notifications.data);
            if(groupsError || friendsError || user === undefined) showInvalidToken();
        }
        initData();
    }, [])

    useEffect(() => {
        SocketService.listen('receiveNotification').then((data) => setNotifications([...Notifications,data]));
        SocketService.listen('receiveDismissNotification').then((data) => {
            const tmp = [...Notifications];
            for (let index = 0; index < tmp.length; index++) if(tmp[index].Id === data) tmp.splice(index, 1);
            setNotifications(tmp);
        });
    }, [Notifications])

    useEffect(() => {
        SocketService.listen('receiveReceiveInvite').then((data) => setFriendsArray([...FriendsArray,data]));
    }, [FriendsArray])

    const returnToLogin = (e) => {
        SessionStorageServiceSync.clearSessionStorage();
        history.push("/LoginPage");
    };

    const leaveGroup = async (e) => {
        const [res, resError] = await AwaitHandling(friendProxyService.leaveGroup(e));
        if (!resError) setGroupsArray(userViewFunctions.updateLeaveGroups(e, GroupsArray));
    };

    const blockFriend = async (e) => {
        const [res, resError] = await AwaitHandling(friendProxyService.blockFriend(e));
        if (!resError) setFriendsArray(userViewFunctions.updateBlockFriendStatus(e, FriendsArray));
    };

    const removeFriend = async (e) => {
        const [res, resError] = await AwaitHandling(friendProxyService.removeFriend(e));
        if (!resError) setFriendsArray(userViewFunctions.updateRemoveFriendStatus(e, FriendsArray));
    };

    const createGroup = async (e) => {
        const [res, resError] = await AwaitHandling(friendProxyService.createNewGroup(e));
        if (!resError) setGroupsArray(userViewFunctions.updateCreateGroups(res.data, GroupsArray));
    };
    
    const addFriendToGroup = async (e) => {
        const [res, resError] = await AwaitHandling(friendProxyService.addFriendToGroup(e, CurrentPickedUser));
        if (!resError && !res.data.alreadyExist) setGroupsArray(userViewFunctions.updateAddFriendToGroup(res.data, GroupsArray));
    };

    // sockets
    const sendFriendInvite = (e) => friendSocketService.sendFriendRequest(e);
    const dismissNotification = (e) => friendSocketService.dismissNotification(e);
    const receiveInvite = (e) => friendSocketService.receiveInvite(e);
    const refuseInvite = (e) => friendSocketService.refuseInvite(e);

    const dragFriend = (e) => setCurrentPickedUser(e);
    const addFriend = () => FillPopupService(setPopupHeader, setCurrentPopupForm, setOpenBeforeTestPop, 'Add more friends', <AddFriendForm submitFriend={sendFriendInvite} />);
    const addGroup = () => FillPopupService(setPopupHeader, setCurrentPopupForm, setOpenBeforeTestPop, 'Create a new group', <AddGroupForm submitGroup={createGroup} />);
    const showInvalidToken = () => FillPopupService(setPopupHeader, setCurrentPopupForm, setOpenBeforeTestPop, 'Oh no!', <InvalidTokenPopup returnToLogin={returnToLogin} />);
    
    const addLike = (e) => postProxyService.addLike(e);
    const addComment = (e, postId) => postProxyService.addComment(e, postId);
    const deletePost = (e) => postProxyService.deletePost(e);
    const editPost = (e) => console.log(e);

    const showPost = async (e) => {
        // init data
        const [res, resError] = await AwaitHandling(postProxyService.getPost(e));
        if (!resError) {
            const p = res.data;
            setCurrentPost(res.data);
            FillPopupService(setPopupHeader, setCurrentPopupForm, setOpenBeforeTestPop, 'Post', 
            <ProfileFeedElement
            postId={p.Id} 
            title={p.Title}
            image={p.Image}
            addLike={addLike}
            addComment={addComment}
            description={p.Description}
            date={SmallDate(p.TimeStamp)}
            userId = {User.Id}
            editPost={editPost}
            deletePost={deletePost} />);
        }

    };

    return (
        <>
        <SideNav 
        notifications={Notifications} 
        url={history.location.pathname} 
        seeFeed={() => history.push("/MainPage")} 
        logOut={returnToLogin}
        dismissNotification={dismissNotification} 
        receiveInvite={receiveInvite}
        refuseInvite={refuseInvite}
        >
                <Grid columns={1} className='fullHeight'>
                    <Grid.Column>
                        <div className='fullHeight'>
                            <Profile
                                className='fullHeight'
                                image={User.Avatar}
                                userData={{ userName: User.UserName, numberOfFriends: FriendsArray.length }} 
                                userImages={UserImages} 
                                openImage={showPost}/>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div className='fullHeight'>
                            <Friends className='fullHeight'
                                friends={FriendsArray}
                                blockFriend={blockFriend}
                                removeFriend={removeFriend}
                                addFriend={addFriend}
                                onDrag={dragFriend}
                                watchProfile={(e)=> history.push('Profile/'+ e)}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div className='fullHeight'>
                            <Groups className='fullHeight'
                                groups={GroupsArray}
                                leaveGroup={leaveGroup}
                                addGroup={addGroup}
                                onDrop={addFriendToGroup}
                            />
                        </div>
                    </Grid.Column>
                </Grid>

                <Popup setPop={() => { setOpenBeforeTestPop(false) }} Pop={OpenBeforeTestPop} header={PopupHeader}>
                    {CurrentPopupForm}
                </Popup>
        </SideNav>
        </>
    );
};
export default UserView;