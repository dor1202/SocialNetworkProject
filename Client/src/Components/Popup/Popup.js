import {  Button, Modal } from 'semantic-ui-react';
import React from "react";
import './Popup.css';

const Popup = (props) => {
    return (
        <>
            <Modal id='customPopup' onClose={() => props.setPop(false)} onOpen={() => props.setPop(true)} open={props.Pop}>
                <Modal.Header id='disableBack' className='noselect'>{props.header}</Modal.Header>
                <Modal.Content id='disableBack' image className='noselect'>
                    <Modal.Description>
                        {props.children}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions id='disableBack'>
                    <Button className='backBtn' color='black' onClick={() => props.setPop(false)}>
                        Back
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

export default Popup;