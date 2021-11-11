import './MenuButtonPopup.css';
import React from "react";
import { Icon } from 'semantic-ui-react';

const MenuButtonPopup = ({ onClick = undefined,IsVisible = false, content = '', image='', blockStatus=false, BtnOnClick=undefined}) => {
    return (
        <>
            <div className='menu-popup'>
                <button onClick={BtnOnClick} className='popup-menu-button popup-menu-button-left' style={{ display: IsVisible ? 'inline-block' : 'none' }}><Icon name='user outline'/></button>
            </div>
            <div className='avatar' onClick={onClick} dangerouslySetInnerHTML={{ __html: image }}></div>
            <span className={blockStatus === true? 'blockFriend': ''}>{content}</span>
        </>
    );
};

export default MenuButtonPopup;