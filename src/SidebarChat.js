import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";
import db from "./firebase";
import { Link } from "react-router-dom";

const SidebarChat = ({ id, name, addNewChat }) => {
  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar_chat">
        <Avatar src="https://media-exp1.licdn.com/dms/image/C4D03AQFCU_OIgxG5kg/profile-displayphoto-shrink_100_100/0?e=1605744000&v=beta&t=Zhukmp7w62LMVsS2o67x_5jHuDqHQbLU7alyZaVGIvI" />
        <div className="sidebar_chat_info">
          <h2>{name}</h2>
          <p>Last message</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebar_chat">
      <h2>Add new Chat</h2>
    </div>
  );
};

export default SidebarChat;
