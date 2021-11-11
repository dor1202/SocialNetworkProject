import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import MenuButtonPopup from "../MenuButtonPopup/MenuButtonPopup";
import './Friend.css';

const Friends = ({ className = '', friends = [], watchProfile=undefined }) => {
    const [IsVisible, setIsVisible] = useState([]);
    const [CurrentFriends, setCurrentFriends] = useState(friends);
    useEffect(() => {
        var initVisibility = [];
        for (let index = 0; index < friends.length; index++) initVisibility[index] = false;
        setIsVisible(initVisibility);
    }, [])

    useEffect(() => {
        setCurrentFriends(friends);
    }, [friends])

    const onClickMenu = (index) => {
        let temp = [...IsVisible];
        temp[index] = !temp[index];
        setIsVisible(temp);
    };

    return (
        <>
            <div className={`shadow ${className}`}>
                <h2>Friends</h2>
                <Grid columns={10} className='friends-scroll'>
                    {CurrentFriends.map((element, index) => {
                        return (
                            <Grid.Column className='pad'>
                                <MenuButtonPopup
                                    onClick={() => onClickMenu(index)}
                                    IsVisible={IsVisible[index]}
                                    content={element.userName}
                                    image={element.image}
                                    blockStatus={element.isBlocked}
                                    BtnOnClick={()=> watchProfile(element.email)}
                                    />
                            </Grid.Column>
                        );
                    })}
                </Grid>
            </div>

        </>
    );
};

export default Friends;