import NotificationCenter from "Components/Navs/NotificationCenter/NotificationCenter";
import NavigateSideNavProfile from "Components/Navs/NavigateSideNavProfile/NavigateSideNavProfile";
import NavigateSideNavMain from "Components/Navs/NavigateSideNavMain/NavigateSideNavMain";
import { Button, Sidebar } from "semantic-ui-react";
import React, { useState } from "react";
import "./SideNav.css";
import NavigateSideNavFriendsProfile from "../NavigateSideNavFriendsProfile/NavigateSideNavFriendsProfile";

const SideNav = ({ refuseInvite = undefined, receiveInvite = undefined, dismissNotification = undefined, notifications = [], children, url = '', seeProfile = undefined, newPost = undefined, seeFeed = undefined, logOut = undefined, openFilter = undefined, switchFeed = undefined }) => {

    // States
    const [visible, setVisible] = useState(false)

    //Functions
    const renderNav = () => {
        const u = url.split('/')[1];
        switch (u) {
            case 'MainPage':
                return <NavigateSideNavMain
                    className='customSidebar'
                    visible={visible}
                    seeProfile={seeProfile}
                    newPost={newPost}
                    openFilter={openFilter}
                    switchFeed={switchFeed} />
            case 'UserPage':
                return <NavigateSideNavProfile
                    className='customSidebar'
                    visible={visible}
                    seeFeed={seeFeed}
                    logOut={logOut} />
            case 'Profile':
                return <NavigateSideNavFriendsProfile
                    className='customSidebar'
                    visible={visible}
                    seeFeed={seeFeed}
                    seeProfile={seeProfile} />

            default:
                return <></>


        }
    };

    return (
        <>
            <Sidebar.Pushable >

                <NotificationCenter
                    className='customSidebar'
                    notifications={notifications}
                    visible={visible}
                    setVisible={setVisible}
                    dismissNotification={dismissNotification}
                    receiveInvite={receiveInvite}
                    refuseInvite={refuseInvite}
                />

                {renderNav()}

                <Sidebar.Pusher dimmed={visible}>
                    <div className='buttonDiv'>
                        <Button
                            className='navButton'
                            color='facebook'
                            icon="setting"
                            onClick={(e) => setVisible(!visible)} />
                    </div>
                    {children}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </>
    );
};

export default SideNav;