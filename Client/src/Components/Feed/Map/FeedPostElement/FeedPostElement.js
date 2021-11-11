import UsersComments from "Components/Comments/UsersComments/UsersComments";
import { Button, Grid, Label, Icon, Divider } from "semantic-ui-react";
import userProxyService from "Services/ProxyServices/userProxyService";
import postProxyService from "Services/ProxyServices/postProxyService";
import MapImageIcon from "Components/Feed/Map/Icons/MapImageIcon/MapImageIcon";
import envExport from 'Environment/environment';
import { Marker, Popup } from 'react-leaflet';
import MapIcon from "Components/Feed/Map/Icons/MapIcon/MapIcon";
import React, { useState } from "react";
import './FeedPostElement.css';
import CapitalizeFirstLetter from "Components/Pipes/CapitalFirstLetter";
import AwaitHandling from "Services/AwaitHandling/AwaitHandling";

const FeedPostElement = ({ postId = 0, lat = 0, lan = 0, title = '', image = '', addLike = undefined, addComment = undefined, description = '', date = '', userId = '', showImgIcon = false, editPost = undefined, deletePost = undefined, isPublic = false }) => {

    // States
    const [comments, setComments] = useState([{ avatar: '', Author: '', MetaData: '', Text: '' }]);
    const [taggedUsers, setTaggedUsers] = useState([{ userName: '', avatar: '' }]);
    const [userAvatar, setUserAvatar] = useState('');
    const [userName, setUserName] = useState('');
    const [Likes, setLikes] = useState(0);
    const [PostId, setPostId] = useState(0);
    const [ImageTags, setImageTags] = useState([]);

    // Functions

    const getUser = async (id = userId) => {
        const user = await userProxyService.getUser(id);
        setUserName(user.data.UserName);
        setUserAvatar(user.data.Avatar);
    };

    const initPost = async () => {
        await getUser();
        const [comments, commentsError] = await AwaitHandling(postProxyService.getComments(postId));
        if(!commentsError) setComments(comments.data);
        const [userTag, userTagError] = await AwaitHandling(postProxyService.getTaggedUsers(postId));
        if(!userTagError) setTaggedUsers(userTag.data);
        const [likes, likesError] = await AwaitHandling(postProxyService.getLikesInPost(postId));
        if(!likesError) setLikes(parseInt(likes.data));
        const [tags, tagsError] = await AwaitHandling(postProxyService.getTagsInPost(postId));
        if(!tagsError) setImageTags(tags.data);
        setPostId(postId);
    };

    const addLikeUI = async (e) => {
        const l = await addLike(postId);
        setLikes(parseInt(l.data));
    };

    const updateComments = (e) => {
        const tmp = [...comments, e];
        setComments(tmp);
    };

    const addCommentsUI = async (e) => {
        const c = await addComment(e, postId);
        updateComments(c);
    };

    return (
        <Marker position={[lat, lan]} eventHandlers={{
            click: initPost,
        }} icon={showImgIcon ? MapImageIcon(image) : MapIcon()}>
            <Popup className='popup-size'>
                <Grid style={{ width: '40vw' }} divided>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <img src={image} alt='err' />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Grid columns={2}>
                                <Grid.Column><h2>{CapitalizeFirstLetter(title)}</h2></Grid.Column>
                                <Grid.Column>
                                        <span>{date}</span>
                                        <Icon className='postStatus' name={isPublic? 'globe':'privacy'}/>
                                </Grid.Column>
                            </Grid>
                            <Divider />
                            <Grid columns={1}>
                                <Grid.Column>
                                    <p>
                                        <div>
                                            {ImageTags.map((element, index) => {
                                                let c = index / (envExport.tagsColorOrder.length) | 0;
                                                return <Label key={'label' + index} circular color={envExport.tagsColorOrder[index - (envExport.tagsColorOrder.length * c)]}>{element.Text}</Label>;
                                            })}
                                        </div>
                                    </p>
                                </Grid.Column>
                                <Grid.Column>
                                    <p>
                                        {taggedUsers.map((element, index) => {
                                            return (
                                                <div key={'div' + index}>
                                                    <div className='avatar' dangerouslySetInnerHTML={{ __html: element.avatar }}></div>
                                                    <span>{element.userName}</span>
                                                </div>
                                            );
                                        })}
                                    </p>
                                </Grid.Column>
                            </Grid>
                            <p style={{ border: '0.1px solid grey', textAlign: 'center' }}>
                                {CapitalizeFirstLetter(description)}
                            </p>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Divider />
                            <div className='avatar' dangerouslySetInnerHTML={{ __html: userAvatar }}></div>
                            <span>{userName}</span>
                            <br />
                            <br />
                            <br />
                            <Button className='buttonBottom' as='div' labelPosition='right'>
                                <Button color='red' onClick={addLikeUI}>
                                    <Icon name='heart' />
                                    Like
                                </Button>
                                <Label basic color='red' pointing='left'>
                                    {Likes}
                                </Label>
                            </Button>

                            <Button.Group className='buttonBottom'>
                                <Button color='yellow' onClick={() => editPost({ PostId, title, description, ImageTags, taggedUsers, image, isPublic })}><Icon name='edit' /></Button>
                                <Button.Or />
                                <Button color='purple' onClick={() => deletePost(PostId)}><Icon name='delete' /></Button>
                            </Button.Group>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <UsersComments commentData={comments} addComment={addCommentsUI} isMapFeed={true} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Popup>
        </Marker>
    );
};

export default FeedPostElement;