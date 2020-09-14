import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
  Mic,
} from "@material-ui/icons";
import React from "react";
import "./Chat.css";
import MicIcon from "@material-ui/icons/Mic";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />

        <div className="chat_header_info">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat_header_right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        <p className="chat_body_message">
          <span className="chat_body_name">Simon</span>
          This is a message
          <span className="chat_body_timestamp">
            {new Date().toUTCString()}
          </span>
        </p>
        <p className="chat_body_message chat_body_receiver">
          <span className="chat_body_name">Simon</span>
          This is a message
          <span className="chat_body_timestamp">
            {new Date().toUTCString()}
          </span>
        </p>
        <p className="chat_body_message">
          <span className="chat_body_name">Simon</span>
          This is a message
          <span className="chat_body_timestamp">
            {new Date().toUTCString()}
          </span>
        </p>
      </div>

      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input type="text" placeholder="type a message" />
          <button type="submit">Send a message</button>
          <MicIcon />
        </form>
      </div>
    </div>
  );
};

export default Chat;
