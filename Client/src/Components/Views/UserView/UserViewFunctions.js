import SessionStorageService from "Services/SessionServices/SessionStorageServiceSync";
import jwtDecode from 'Services/JWTService/JWTService';

function getUser(token) {
    try{
        const a = SessionStorageService.getFromSessionStorage('Avatar');
        const d = jwtDecode.DecodeToken(token);
        return {Id: d.userTemplate.Id ,UserName: d.userTemplate.UserName, Avatar: a};
    } catch(err){ return undefined; }
}

function updateBlockFriendStatus (e, FriendsArray) {
    const tmp = [...FriendsArray];
    const tmp2 = tmp.map(element => {
        if(element.id === e){
            element.isBlocked = !element.isBlocked
        }
        return element;
    });
    return tmp2;
}

function updateRemoveFriendStatus (e, FriendsArray) {
    const tmp = [...FriendsArray];
    for (let index = 0; index < tmp.length; index++) {
        if(tmp[index].id === e) tmp.splice(index,1);
    }
    return tmp;
}

function updateLeaveGroups (e, groupsArray) {
    const tmp = [...groupsArray];
    for (let index = 0; index < tmp.length; index++) {
        if(tmp[index].id === e) tmp.splice(index,1);
    }
    return tmp;
}

function updateCreateGroups (e, groupsArray) {
    const tmp = [...groupsArray,e];
    return tmp;
}

function updateAddFriendToGroup(e,groupsArray) {
    const tmp = [...groupsArray];
    for (let index = 0; index < tmp.length; index++) {
        if(tmp[index].id === e.id) tmp[index].friends.push(e.newFriend);
    }
    return tmp;
}

function updateAddFriend(e,friendsArray) {
    const tmp = [...friendsArray];
    tmp.push(e);
    return tmp;
}


const userViewFunctions = {
    getUser,
    updateBlockFriendStatus,
    updateRemoveFriendStatus,
    updateLeaveGroups,
    updateCreateGroups,
    updateAddFriendToGroup,
    updateAddFriend
};

export default userViewFunctions;