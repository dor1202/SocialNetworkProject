import { Button, Comment, Form, Header, Segment } from 'semantic-ui-react';
import { MentionsInput, Mention } from 'react-mentions'
import SmallDate from "Components/Pipes/SmallDate";
import React, { useEffect, useState } from "react";
import './UserComments.css';
import CommentElement from 'Components/Comments/CommentElement/CommentElement';
import postProxyService from 'Services/ProxyServices/postProxyService';
import friendProxyService from 'Services/ProxyServices/friendProxyService';
import AwaitHandling from 'Services/AwaitHandling/AwaitHandling';

const UsersComments = ({ commentData = [], addComment = undefined, isMapFeed = false }) => {
    // States
    const [userCommentData, setUserCommentData] = useState('');
    const [TaggedUsers, setTaggedUsers] = useState([]);
    const [Tags, setTags] = useState([]);

    useEffect(() => {
        async function getFeedAndMembers() {
            const [feed, feedError] = await AwaitHandling(postProxyService.getAllTags());
            const feedData = feed.data;
            let tmp1 = [];
            for (let index = 0; index < feedData.length; index++) tmp1.push({id: feedData[index].Id, display: feedData[index].Text});
            setTags(tmp1);
            const [members, membersError] = await AwaitHandling(friendProxyService.getMembers());
            const membersData = members.data;
            let tmp = [];
            for (let index = 0; index < membersData.length; index++) tmp.push({id: membersData[index].value, display: membersData[index].text});
            setTaggedUsers(tmp)
        }
        getFeedAndMembers();
    }, [])

    return (
        <>
            <Comment.Group className={`scrollable-comments ${isMapFeed ? 'map-comment-feed' : 'normal-comment-feed'}`} size='massive'>
                <Header as='h3' dividing>
                    Comments
                </Header>

                {commentData.map((element) => {
                    return (
                        <Segment>
                            <Comment>
                                <Comment.Avatar dangerouslySetInnerHTML={{ __html: element.avatar }} />
                                <Comment.Content>
                                    <Comment.Author as='a'>{element.Author}</Comment.Author>
                                    <Comment.Metadata>
                                        <span>{SmallDate(element.Metadata)}</span>
                                    </Comment.Metadata>
                                    <Comment.Text><CommentElement text={element.Text} forNewComment={false}/></Comment.Text>
                                </Comment.Content>
                            </Comment>
                        </Segment>
                    );
                })}
            </Comment.Group>
            <CommentElement text={userCommentData} forNewComment={true}/>
            <Form reply>
                <MentionsInput className='commentTextArea' value={userCommentData} onChange={(e) => setUserCommentData(e.target.value)}>
                    <Mention trigger="@" data={TaggedUsers} />
                    <Mention trigger="#" data={Tags} />
                </MentionsInput>
                <Button className='addCommentButton' content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => { addComment(userCommentData); setUserCommentData(''); }} />
            </Form>
        </>
    );
};

export default UsersComments;