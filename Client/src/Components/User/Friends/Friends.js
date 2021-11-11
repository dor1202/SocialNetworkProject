import MenuButtonPopup from "Components/Buttons/MenuButtonPopup/MenuButtonPopup";
import CustomHeader from "Components/CustomHeader/CustomHeader";
import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import './Friend.css';

const Friends = ({ onDrag = undefined, className = '', friends = [], blockFriend=undefined, removeFriend=undefined, addFriend = undefined, watchProfile=undefined }) => {
    const [UpdateTableAfterSearch, setUpdateTableAfterSearch] = useState(false);
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
                <CustomHeader addData={addFriend} headerContent='Friends' inputPlaceHolder='Search friends' friends={friends} emitChange={(e)=>{setCurrentFriends(e);setUpdateTableAfterSearch(!UpdateTableAfterSearch);}} searchByProp='userName'/>
                <Grid columns={10} className='friends-scroll'>
                    {CurrentFriends.map((element, index) => {
                        return (
                            <Grid.Column className='pad'>
                                <MenuButtonPopup
                                    onDrag={()=>onDrag(element)}
                                    onClick={() => onClickMenu(index)}
                                    IsVisible={IsVisible[index]}
                                    content={element.userName}
                                    firstBtnContent='X'
                                    secondBtnContent='!'
                                    firstBtnOnClick={() => removeFriend(element.id)}
                                    secondBtnOnClick={() => blockFriend(element.id)}
                                    thirdBtnOnClick={()=> watchProfile(element.email)}
                                    image={element.image}
                                    blockStatus={element.isBlocked}
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