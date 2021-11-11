import ProfileFeedElement from "Components/Feed/ProfileFeedElement/ProfileFeedElement";
import SideNav from "Components/Navs/SideNav/SideNav";
import SmallDate from "Components/Pipes/SmallDate";
import Popup from "Components/Popup/Popup";
import Friends from "Components/Profile/Friends/Friends";
import Groups from "Components/Profile/Groups/Groups";
import Profile from "Components/Profile/Profile/Profile";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import AwaitHandling from "Services/AwaitHandling/AwaitHandling";
import FillPopupService from "Services/FillPopupService/FillPopupService";
import friendProxyService from "Services/ProxyServices/friendProxyService";
import postProxyService from "Services/ProxyServices/postProxyService";
import userProxyService from "Services/ProxyServices/userProxyService";
import friendSocketService from "Services/SocketService/Sockets/friendSocketService";
import './ProfileView.css';

const ProfileView = () => {

    // States
    let { email } = useParams();
    const history = useHistory();
    const [Notifications, setNotifications] = useState([]);
    const [CurrentPopupForm, setCurrentPopupForm] = useState(<div></div>);
    const [OpenBeforeTestPop, setOpenBeforeTestPop] = useState(false);
    const [PopupHeader, setPopupHeader] = useState('');
    const [User, setUser] = useState({ Id: '', UserName: '', Avatar: '' });
    const [FriendsArray, setFriendsArray] = useState([{ id: '', userName: '', image: '', isBlocked: false }]);
    const [UserImages, setUserImages] = useState([]);
    const [GroupsArray, setGroupsArray] = useState([]);

    // Functions
    useEffect(() => {
        async function init() {

            const [user, userError] = await AwaitHandling(userProxyService.getUserByEmail(email));
            if (!userError) setUser(user.data);
            const [friends, friendsError] = await AwaitHandling(friendProxyService.getFriendsByEmail(email));
            if (!friendsError) setFriendsArray(friends.data);
            console.log(friends.data);
            const [userImages, userImagesError] = await AwaitHandling(userProxyService.getUserImagesByEmail(email));
            if (!userImagesError) setUserImages(userImages.data);
            const [groups, groupsError] = await AwaitHandling(friendProxyService.getGroupsByEmail(email));
            if (!groupsError) setGroupsArray(groups.data);
        }

        init();
    }, [])

    const addLike = (e) => postProxyService.addLike(e);
    const addComment = (e, postId) => postProxyService.addComment(e, postId);

    const showPost = async (e) => {
        // init data
        const [res, resError] = await AwaitHandling(postProxyService.getPost(e));
        if (!resError) {
            const p = res.data;
            FillPopupService(setPopupHeader, setCurrentPopupForm, setOpenBeforeTestPop, 'Post',
                <ProfileFeedElement
                    postId={p.Id}
                    title={p.Title}
                    image={p.Image}
                    addLike={addLike}
                    addComment={addComment}
                    description={p.Description}
                    date={SmallDate(p.TimeStamp)}
                    userId={User.Id} />);
        }

    };

    const dismissNotification = (e) => friendSocketService.dismissNotification(e);
    const receiveInvite = (e) => friendSocketService.receiveInvite(e);
    const refuseInvite = (e) => friendSocketService.refuseInvite(e);

    return (
        <>
            <SideNav
                notifications={Notifications}
                url={history.location.pathname}
                seeFeed={() => history.push("/MainPage")}
                seeProfile={() => history.push('/UserPage')}
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
                                openImage={showPost} />
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div className='fullHeight'>
                            <Friends className='fullHeight'
                                friends={FriendsArray} 
                                watchProfile={(e) => {history.push(e); window.location.reload();}} />
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div className='fullHeight'>
                            <Groups className='fullHeight'
                                groups={GroupsArray} />
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

export default ProfileView;