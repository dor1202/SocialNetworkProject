import NotificationDataModel from "./NotificationDataModel/NotificationDataModel";
import { Menu, Sidebar } from "semantic-ui-react";
import './NotificationCenter.css';
import React from "react";

const NotificationCenter = ({ className='', notifications = [], dismissNotification = undefined, visible = false, setVisible = undefined, receiveInvite = undefined, refuseInvite = undefined }) => {
  return (
    <Sidebar
      className={className}
      as={Menu}
      animation='overlay'
      direction='left'
      icon='labeled'
      inverted
      onHide={() => setVisible(false)}
      vertical
      visible={visible}
      width='wide'
    >
      {notifications.map((element) => {
        return <NotificationDataModel
          id={element.Id}
          text={element.Text}
          image={element.Image}
          userName={element.UserName}
          timeStamp={element.TimeStamp}
          dismissNotification={dismissNotification}
          NotificationType={element.NotificationType}
          receiveInvite={receiveInvite}
          refuseInvite={refuseInvite}
        />
      })}
    </Sidebar>
  );
};

export default NotificationCenter;