import { Icon, Menu, Sidebar } from "semantic-ui-react";
import React from "react";

const NavigateSideNavFriendsProfile = ({ className='', visible = false, seeFeed=undefined,seeProfile=undefined }) => {
    return (
        <Sidebar
            className={className}
            as={Menu}
            animation='overlay'
            direction='right'
            inverted
            vertical
            visible={visible}
            width='thin'
            icon='labeled'
        >
            <Menu.Item as='a' onClick={seeFeed}>
                <Icon name='feed' />
                See Feed
            </Menu.Item>
            <Menu.Item as='a' onClick={seeProfile}>
                <Icon name='user' />
                See Profile
            </Menu.Item>
        </Sidebar>
    );
};

export default NavigateSideNavFriendsProfile;