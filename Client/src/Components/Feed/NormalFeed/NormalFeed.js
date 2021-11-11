import UsersComments from "Components/Comments/UsersComments/UsersComments";
import postProxyService from "Services/ProxyServices/postProxyService";
import NormalFeedElement from "Components/Feed/NormalFeed/NormalFeedElement/NormalFeedElement";
import SmallDate from "Components/Pipes/SmallDate";
import React, { useEffect, useState } from "react";
import Popup from "Components/Popup/Popup";
import "./NormalFeed.css";
import AwaitHandling from "Services/AwaitHandling/AwaitHandling";
import { Button } from "semantic-ui-react";

const NormalFeed = ({ feedData = [], addLike = undefined, addComment = undefined, editPost=undefined, deletePost=undefined, refreshFeed=undefined}) => {

    // States
    const [comments, setComments] = useState([{ avatar: '', Author: '', MetaData: '', Text: '' }]);
    const [OpenBeforeTestPop, setOpenBeforeTestPop] = useState(false);
    const [ShowImageIcon, setShowImageIcon] = useState(false);
    const [CurrentPostId, setCurrentPostId] = useState(0);

    useEffect(() => {
        if (feedData.length >= 30 && ShowImageIcon) setShowImageIcon(false);
        else if (feedData.length <= 30 && !ShowImageIcon) setShowImageIcon(true);
    }, [feedData])

    //Functions
    const addLikeToPost = (e) => addLike(e);
    const DeletePost = (e) => deletePost(e);
    const EditPost = (e) => editPost(e);

    const updateComments = (e) => {
        const tmp = [...comments, e];
        setComments(tmp);
    };

    const addCommentsUI = async (e, postId) => {
        const c = await addComment(e, CurrentPostId)
        updateComments(c.data);
    };

    const getComments = async (postId) => {
        const [commentsTemp, commentsTempError] = await AwaitHandling(postProxyService.getComments(postId));
        if(!commentsTempError) setComments(commentsTemp.data);
    };

    const openComments = (postId) => {
        setOpenBeforeTestPop(true);
        getComments(postId);
        setCurrentPostId(postId);
    };

    return (
        <div className='normalViewDiv'>
            {feedData.map((element, index) => {
                return <NormalFeedElement
                    key={'feedElement' + index}
                    postId={element._id}
                    title={element._source.Title}
                    img={element._source.Image}
                    addLike={addLikeToPost}
                    description={element._source.Description}
                    date={SmallDate(element._source.TimeStamp)}
                    openComments={()=>openComments(element.Id)}
                    editPost={EditPost}
                    deletePost={DeletePost}
                    initPostOnStart={index < 3}
                    isPublic={element._source.IsPublic}
                />
            })}
            <Popup setPop={() => { setOpenBeforeTestPop(false) }} Pop={OpenBeforeTestPop}>
                <UsersComments commentData={comments} addComment={addCommentsUI} isMapFeed={false}/>
            </Popup>
        </div>
    );
};

export default NormalFeed;