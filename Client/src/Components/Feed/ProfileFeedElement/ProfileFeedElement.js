import UsersComments from "Components/Comments/UsersComments/UsersComments";
import { Button, Grid, Label, Icon, Divider, Segment } from "semantic-ui-react";
import userProxyService from "Services/ProxyServices/userProxyService";
import postProxyService from "Services/ProxyServices/postProxyService";
import envExport from 'Environment/environment';
import React, { useEffect, useState } from "react";
import CapitalizeFirstLetter from "Components/Pipes/CapitalFirstLetter";
import AwaitHandling from "Services/AwaitHandling/AwaitHandling";

const ProfileFeedElement = ({ postId = 0, title = '', image = '', addLike = undefined, addComment = undefined, description = '', date = '', userId = '' }) => {

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

    useEffect(() => {
        async function initPost(){
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
        }
        initPost();
    }, [])



    const addLikeUI = async (e) => {
        const l = await addLike(postId);
        setLikes(parseInt(l.data));
    };

    const updateComments = (e) => {
        const tmp = [...comments, e];
        setComments(tmp);
    };

    const addCommentsUI = async (e) => {
        const c = await addComment(e, postId)
        updateComments(c.data);
    };

    return (
            <Segment>
                
                <Grid style={{ width: '70vw', height: '90vh' }} divided>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <img src={image} alt='err' />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Grid columns={2}>
                                <Grid.Column><h2>{CapitalizeFirstLetter(title)}</h2></Grid.Column>
                                <Grid.Column><span>{date}</span></Grid.Column>
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
                            <br/>
                            <br/>
                            <br/>
                            <Button className='buttonBottom' as='div' labelPosition='right'>
                                <Button color='red' onClick={addLikeUI}>
                                    <Icon name='heart' />
                                    Like
                                </Button>
                                <Label basic color='red' pointing='left'>
                                    {Likes}
                                </Label>
                            </Button>

                        </Grid.Column>
                        <Grid.Column width={10}>
                            <UsersComments commentData={comments} addComment={addCommentsUI} isMapFeed={true} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
    );
};

export default ProfileFeedElement;