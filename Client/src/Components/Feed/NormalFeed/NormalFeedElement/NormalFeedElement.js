import { Button, Grid, Icon, Label, Segment, Image } from "semantic-ui-react";
import postProxyService from "Services/ProxyServices/postProxyService";
import VisibilitySensor from 'react-visibility-sensor';
import envExport from "Environment/environment";
import React, { useEffect, useState } from "react";
import "./NormalFeedElement.css";
import AwaitHandling from "Services/AwaitHandling/AwaitHandling";

const NormalFeedElement = ({ postId = 0, isPublic = false, title = '', img = '', addLike = undefined, description = '', date = '', openComments = undefined,editPost=undefined, deletePost=undefined, initPostOnStart=false }) => {
    
    // States
    const [taggedUsers, setTaggedUsers] = useState([{ userName: '', avatar: '' }]);
    const [Likes, setLikes] = useState(0);
    const [PostId, setPostId] = useState(0);
    const [ImageTags, setImageTags] = useState([]);
    const [AlreadyInit, setAlreadyInit] = useState(false);
    const [image, setImage] = useState('');
    
    // Functions
    const initPost = async () => {
        const [tagUser, tagUserError] = await AwaitHandling(postProxyService.getTaggedUsers(postId));
        if(!tagUserError) setTaggedUsers(tagUser.data);
        const [likes, likesError] = await AwaitHandling(postProxyService.getLikesInPost(postId));
        if(!likesError) setLikes(parseInt(likes.data));
        const [tags, tagsError] = await AwaitHandling(postProxyService.getTagsInPost(postId));
        if(!tagsError) setImageTags(tags.data);
        setPostId(postId);
    };

    const addLikeUI = async (e) => {
        const l = await addLike(postId);
        setLikes(parseInt(l.data));
    }

    useEffect(() => {
        if(initPostOnStart) initPost();
        setImage(img);
        console.log(image);
    }, [])

    return (
        <VisibilitySensor
            onChange={(isVisible) => {
                if(isVisible && !AlreadyInit) {
                    initPost();
                    setAlreadyInit(true);
                }
            }}
        >
            <Segment>
                <Grid>
                    <Grid.Column width={5}>
                        <Image src={image} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <div>
                            <h2>{title}</h2>
                            <span>{date}</span>
                            <Icon className='postStatus' name={isPublic? 'globe':'privacy'}/>
                            <p>
                                <div>
                                    {ImageTags.map((element, index) => {
                                        let c = index / (envExport.tagsColorOrder.length) | 0;
                                        return <Label key={'label' + index} circular color={envExport.tagsColorOrder[index - (envExport.tagsColorOrder.length * c)]}>{element.Text}</Label>;
                                    })}
                                </div>
                            </p>
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
                            <p style={{ border: '0.1px solid grey', textAlign: 'center' }}>
                                {description}
                            </p>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Button className='commentBtn' as='div' labelPosition='right'>
                            <Button color='blue' onClick={openComments}>
                                <Icon name='heart' />
                                Comments
                            </Button>
                            <Label basic color='blue' pointing='left'>
                                {Likes}
                            </Label>
                        </Button>

                        <Button className='commentBtn' as='div' labelPosition='right'>
                            <Button color='red' onClick={addLikeUI}>
                                <Icon name='heart' />
                                Like
                            </Button>
                            <Label basic color='red' pointing='left'>
                                {Likes}
                            </Label>
                        </Button>
                            <Button.Group>
                                <Button color='yellow' onClick={()=>editPost({PostId,title,description,ImageTags,taggedUsers,image, isPublic})}><Icon disabled name='edit' /></Button>
                                <Button.Or />
                                <Button color='red' onClick={()=> deletePost(postId)}><Icon disabled name='delete' /></Button>
                            </Button.Group>
                    </Grid.Column>
                </Grid>
            </Segment>
        </VisibilitySensor>
    );
};

export default NormalFeedElement;