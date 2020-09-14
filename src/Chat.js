import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

const Chat = () => {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    // await axios.post("/api/v1/messages/new", {
    //   message: input,
    //   name: "Simon He",
    //   timestamp: new Date().toUTCString(),
    //   received: false,
    // });
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={user?.photoURL} />

        <div className="chat_header_info">
          <h3>{roomName}</h3>
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
