import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import "./Chat.css";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";

const Chat = ({ messages }) => {
  const [input, setInput] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/api/v1/messages/new", {
      message: input,
      name: "Simon He",
      timestamp: new Date().toUTCString(),
      received: false,
    });

    setInput("");
  };

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
        {messages.map((message) => (
          <p
            className={`chat_body_message ${
              message.received && "chat_body_receiver"
            }`}
          >
            <span className="chat_body_name">{message.name}</span>
            {message.message}
            <span className="chat_body_timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            type="text"
            placeholder="type a message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
          <MicIcon />
        </form>
      </div>
    </div>
  );
};

export default Chat;
