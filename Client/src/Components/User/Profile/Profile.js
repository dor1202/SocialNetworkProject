import { Divider, Grid } from "semantic-ui-react";
import React from "react";
import './Profile.css';

const Profile = ({ className = '', image = '', userData = {}, userImages = [], openImage= undefined  }) => {
    return (
        <>
            <div className={`shadow ${className}`}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <div className='fullWidthProfile' dangerouslySetInnerHTML={{ __html: image }}></div>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <div className='fullWidthProfile'>
                                <h2>{userData.userName}</h2>
                                <p>Number of friends: {userData.numberOfFriends}</p>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider />
                <h2>Posts</h2>
                <Grid columns={8} className='profile-scroll'>
                    {userImages.map((element, index) => {
                        return (
                            <Grid.Column>
                                <div className='imageElement'>
                                    <img className='imagePad' alt='err' src={element.Image} draggable={false} onClick={() => openImage(element.Id)}/>
                                    <div className='imageTitle'>{element.Title}</div>
                                </div>
                            </Grid.Column>
                        );
                    })}
                </Grid>
            </div>
        </>
    );
};

export default Profile;