import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";

const SidebarChat = () => {
  return (
    <div className="sidebar_chat">
      <Avatar src="https://media-exp1.licdn.com/dms/image/C4D03AQFCU_OIgxG5kg/profile-displayphoto-shrink_100_100/0?e=1605744000&v=beta&t=Zhukmp7w62LMVsS2o67x_5jHuDqHQbLU7alyZaVGIvI" />
      <div className="sidebar_chat_info">
        <h2>Room name</h2>
        <p>Last message</p>
      </div>
    </div>
  );
};

export default SidebarChat;
