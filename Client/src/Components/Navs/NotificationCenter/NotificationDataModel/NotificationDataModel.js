import SmallDate from "Components/Pipes/SmallDate";
import { Button, Label, Menu } from "semantic-ui-react";
import './NotificationDataModel.css';
import React from "react";
import CapitalizeFirstLetter from "Components/Pipes/CapitalFirstLetter";

const NotificationDataModel = ({ NotificationType = '', id = 0, text = '', image = '', userName = '', timeStamp = new Date(), dismissNotification = undefined, receiveInvite = undefined, refuseInvite = undefined }) => {
    if (NotificationType === "FEEDBACK")
        return (
            <Menu.Item className='customMenuItem' as='div'>
                <div>
                    <div className='avatar' dangerouslySetInnerHTML={{ __html: image }}></div>
                    <Label className='userNameTag' as='a' color='purple' horizontal>{CapitalizeFirstLetter(userName)}</Label>
                    <div>{CapitalizeFirstLetter(text)}</div>
                    <Label className='customLabel timeStampTag' color='red' floating>
                        {SmallDate(timeStamp)}
                        <Button className='round' icon='trash alternate' onClick={()=>dismissNotification(id)}></Button>
                    </Label>
                    <Button className='round yes' onClick={()=> receiveInvite(id)}>✓</Button>
                    <Button className='round no' onClick={()=> refuseInvite(id)}>X</Button>
                </div>
            </Menu.Item>
        );

    else
        return (
            <Menu.Item className='customMenuItem' as='div'>
                <div>
                    <div className='avatar' dangerouslySetInnerHTML={{ __html: image }}></div>
                    <Label className='userNameTag' as='a' color='purple' horizontal>{CapitalizeFirstLetter(userName)}</Label>
                    <div>{CapitalizeFirstLetter(text)}</div>
                    <Label className='customLabel timeStampTag' color='red' floating>
                        {SmallDate(timeStamp)}
                        <Button className='round' icon='trash alternate' onClick={()=>dismissNotification(id)}></Button>
                    </Label>
                </div>
            </Menu.Item>
        );
};

export default NotificationDataModel;