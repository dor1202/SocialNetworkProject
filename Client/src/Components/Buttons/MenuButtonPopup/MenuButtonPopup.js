import './MenuButtonPopup.css';
import React from "react";
import { Icon } from 'semantic-ui-react';

const MenuButtonPopup = ({ onDrag= undefined, onClick = undefined,IsVisible = false, content = '', firstBtnContent='X', firstBtnOnClick = undefined, secondBtnContent='!', secondBtnOnClick = undefined, image='', blockStatus=false, thirdBtnOnClick=undefined}) => {
    return (
        <>
            <div className='menu-popup'>
                <button onClick={firstBtnOnClick} className='popup-menu-button popup-menu-button-left' style={{ display: IsVisible ? 'inline-block' : 'none' }}>{firstBtnContent}</button>
                <button onClick={secondBtnOnClick} className='popup-menu-button popup-menu-button-right' style={{ display: IsVisible ? 'inline-block' : 'none' }}>{secondBtnContent}</button>
                <button onClick={thirdBtnOnClick} className='popup-menu-button popup-menu-button-right-down' style={{ display: IsVisible ? 'inline-block' : 'none' }}><Icon name='user outline'/></button>
            </div>
            <div draggable={true} onDragStart={onDrag} className='avatar' onClick={onClick} dangerouslySetInnerHTML={{ __html: image }}></div>
            <span className={blockStatus === true? 'blockFriend': ''}>{content}</span>
        </>
    );
};

export default MenuButtonPopup;