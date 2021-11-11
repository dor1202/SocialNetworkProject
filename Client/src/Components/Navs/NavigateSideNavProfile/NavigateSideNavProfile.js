import { Icon, Menu, Sidebar } from "semantic-ui-react";
import "./NavigateSideNavProfile.css";
import React from "react";

const NavigateSideNavProfile = ({ className='', visible = false, seeFeed=undefined,logOut=undefined }) => {
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
            <Menu.Item as='a' onClick={logOut}>
                <Icon name='log out' />
                Log out
            </Menu.Item>
        </Sidebar>
    );
};

export default NavigateSideNavProfile;