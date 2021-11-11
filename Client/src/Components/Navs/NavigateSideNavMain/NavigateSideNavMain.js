import { Icon, Menu, Sidebar } from "semantic-ui-react";
import "./NavigateSideNavMain.css";
import React from "react";

const NavigateSideNav = ({ className='', visible = false, seeProfile=undefined,newPost=undefined, switchFeed=undefined, openFilter=undefined }) => {
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
            <Menu.Item as='a' onClick={newPost}>
                <Icon name='paste' />
                New post
            </Menu.Item>
            <Menu.Item as='a' onClick={openFilter}>
                <Icon name='filter' />
                Open filter
            </Menu.Item>
            <Menu.Item as='a' onClick={switchFeed}>
                <Icon name='map' />
                Switch feed view
            </Menu.Item>
            <Menu.Item as='a' onClick={seeProfile}>
                <Icon name='user' />
                See profile
            </Menu.Item>
        </Sidebar>
    );
};

export default NavigateSideNav;