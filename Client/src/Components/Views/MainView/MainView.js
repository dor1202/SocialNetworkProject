import postProxyService from "Services/ProxyServices/postProxyService";
import feedProxyService from "Services/ProxyServices/feedProxyService";
import PostForm from "Components/Forms/PostForm/PostForm";
import React, { useEffect, useState } from "react";
import FeedMap from "Components/Feed/Map/FeedMap/FeedMap";
import { useHistory } from "react-router-dom";
import Popup from "Components/Popup/Popup";
import './MainView.css';
import FilterForm from "Components/Forms/FilterForm/FilterForm";
import InvalidTokenPopup from "Components/InvalidTokenPopup/InvalidTokenPopup";
import SessionStorageService from "Services/SessionServices/SessionStorageServiceSync";
import SideNav from "Components/Navs/SideNav/SideNav";
import NormalFeed from "Components/Feed/NormalFeed/NormalFeed";
import EditPost from "Components/Forms/EditPost/EditPost";
import FillPopupService from "Services/FillPopupService/FillPopupService";
import AwaitHandling from "Services/AwaitHandling/AwaitHandling";
import friendSocketService from "Services/SocketService/Sockets/friendSocketService";
import userProxyService from "Services/ProxyServices/userProxyService";
import { Button } from "semantic-ui-react";
import SocketService from "Services/SocketService/SocketService";

const MainView = () => {

    // States
    const [CurrentPopupForm, setCurrentPopupForm] = useState(<div></div>);
    const [OpenBeforeTestPop, setOpenBeforeTestPop] = useState(false);
    const [Notifications, setNotifications] = useState([]);
    const [PopupHeader, setPopupHeader] = useState('');
    const [IsFeedMap, setIsFeedMap] = useState(true);
    const [Center, setCenter] = useState([0, 0]);
    const [Feed, setFeed] = useState([]);
    const history = useHistory();
    const [NewFeedPossible, setNewFeedPossible] = useState(false);

    // Functions
    useEffect(() => {
        const successCallback = (position) => {
            const Position = { latitude: position.coords.latitude, longitude: position.coords.longitude };
            setCenter([Position.latitude, Position.longitude]);

            async function getFeedAndMembers() {
                const [feed, error] = await AwaitHandling(feedProxyService.getFeed([Position.latitude, Position.longitude]));
                if (!error) setFeed(feed.data);
                const [notifications, notificationsError] = await AwaitHandling(userProxyService.getNotifications());
                if(!notificationsError) setNotifications(notifications.data);
                if(notificationsError || error ) showInvalidToken();
            }
            getFeedAndMembers();
        };
        navigator.geolocation.getCurrentPosition(successCallback, (err) => console.log(err));

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
        SocketService.listen('receiveFeedUpdateAvailable').then(() => {
            if(!NewFeedPossible) setNewFeedPossible(true);
        });
    }, [])

    const submitPost = async (e) => {
        const [newPost, newPostError] = await AwaitHandling(postProxyService.createNewPost(e));
        if(!newPostError) setFeed([...Feed, newPost]);
    };

    const submitPostUpdate = async (e) => {
        const [newPost, newPostError] = await AwaitHandling(postProxyService.updatePost(e));
        if(!newPostError) setFeed([...Feed, newPost]);
    };

    const returnToLogin = (e) => {
        SessionStorageService.clearSessionStorage();
        history.push("/LoginPage");
    };
    
    const editPost = (e) => FillPopupService(setPopupHeader, setCurrentPopupForm, setOpenBeforeTestPop, 'Edit post', <EditPost submitPostUpdate={submitPostUpdate} reIsPublic={e.isPublic} rePostId={e.PostId} reTitle={e.title} reDescription={e.description} reTags={e.ImageTags} reTaggedUsers={e.taggedUsers} reImgFile={e.image} />);
    const showInvalidToken = () => FillPopupService(setPopupHeader, setCurrentPopupForm, setOpenBeforeTestPop, 'Oh no!', <InvalidTokenPopup returnToLogin={returnToLogin} />);
    const showAddPost = () => FillPopupService(setPopupHeader, setCurrentPopupForm, setOpenBeforeTestPop, 'New post', <PostForm submitPost={submitPost} />);
    const showFilter = () => FillPopupService(setPopupHeader, setCurrentPopupForm, setOpenBeforeTestPop, 'Filter post', <FilterForm submitFilter={emitFilter} />);
    const addLike = (e) => postProxyService.addLike(e);
    const addComment = async (e, postId) => {
        // notify the tagged users
        var myRegex = /\@(.*?)\)/g;
        var myArray = [...e.matchAll(myRegex)];
        for (let index = 0; index < myArray.length; index++) {
            console.log(myArray[index][1][1]);
            if(myArray[index][1][1] !== '#'){
                var myRegex1 = /\((.*?)\)/g;
                var myArray1 = [...myArray[index][0].matchAll(myRegex1)];
                const id = parseInt(myArray1[0][1]);
                // send to user based id the notification about the comment
                friendSocketService.notifyTagInComment(id, postId);
            }
        }
        const [newComment, newCommentError] = await AwaitHandling(postProxyService.addComment(e, postId));
        if(!newCommentError) return newComment.data;
    } 
    const deletePost = (e) => postProxyService.deletePost(e);

    // sockets
    const dismissNotification = (e) => friendSocketService.dismissNotification(e);
    const receiveInvite = (e) => friendSocketService.receiveInvite(e);
    const refuseInvite = (e) => friendSocketService.refuseInvite(e);

    const emitFilter = async (filters) => {
        const [newFeed, newFeedError] = await AwaitHandling(feedProxyService.getFeedByParameter(filters, Center));
        if(!newFeedError) setFeed(newFeed.data);
    };

    const updateFeed = async (e) => {
        const [feed, feedError] = await AwaitHandling(feedProxyService.getFeed([e[0], e[1]]));
        if(!feedError) setFeed(feed.data);
        else showInvalidToken();
    };

    const refreshFeed = async (e) => {
        const successCallback = (position) => {
            const Position = { latitude: position.coords.latitude, longitude: position.coords.longitude };
            setCenter([Position.latitude, Position.longitude]);

            async function getFeedAndMembers() {
                const [feed, error] = await AwaitHandling(feedProxyService.getFeed([Position.latitude, Position.longitude]));
                if (!error) setFeed(feed.data);
                const [notifications, notificationsError] = await AwaitHandling(userProxyService.getNotifications());
                if(!notificationsError) setNotifications(notifications.data);
                if(notificationsError || error ) showInvalidToken();
                setNewFeedPossible(false);
            }
            getFeedAndMembers();
        };
        navigator.geolocation.getCurrentPosition(successCallback, (err) => console.log(err));
    };

    return (
        <>
            <SideNav
                notifications={Notifications} 
                url={history.location.pathname}
                seeProfile={() => history.push("/UserPage")}
                newPost={showAddPost}
                openFilter={showFilter}
                switchFeed={() => setIsFeedMap(!IsFeedMap)} 
                dismissNotification={dismissNotification} 
                receiveInvite={receiveInvite}
                refuseInvite={refuseInvite}
                >

                <div className="fullHeight">
                    {
                        IsFeedMap
                            ?
                            <FeedMap feedData={Feed} addLike={addLike} addComment={addComment} Center={Center} setCenter={setCenter} updateFeed={updateFeed} editPost={editPost} deletePost={deletePost} />
                            :
                            <>
                                <Button icon='refresh' onClick={refreshFeed} className={`refreshBtn ${NewFeedPossible && 'rotate'}`} color='facebook'></Button>
                                <NormalFeed feedData={Feed} addLike={addLike} addComment={addComment} editPost={editPost} deletePost={deletePost} refreshFeed={refreshFeed}/>
                            </>
                    }
                </div>

                <Popup setPop={() => { setOpenBeforeTestPop(false) }} Pop={OpenBeforeTestPop} header={PopupHeader}>
                    {CurrentPopupForm}
                </Popup>
            </SideNav>
        </>
    );
};
export default MainView;