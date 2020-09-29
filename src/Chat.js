import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

const Chat = () => {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [limit, setLimit] = useState(10);
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const bottomOfChatRef = useRef();
  const topOfChatRef = useRef();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data()?.name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .limitToLast(limit)
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );

      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          const { pictureSeed } = snapshot.data();
          setSeed(pictureSeed);
        });
    }
  }, [roomId, limit]);

  const scrollToBottom = () => {
    let footerOffset = 62;
    // let elementPosition = document
    //   .getElementById("bottomScroll")
    //   .getBoundingClientRect().top;
    // let bodyPosition = document.body.getBoundingClientRect().top;
    // let offsetPosition = elementPosition - bodyPosition - footerOffset;

    // window.scrollTo({
    //   top: offsetPosition,
    //   behavior: "smooth",
    // });
    let element = document.getElementById("bottomScroll");
    let headerOffset = 62;
    let elementPosition = element.offsetTop;
    let offsetPosition = elementPosition + headerOffset;
    document.documentElement.scrollTop = offsetPosition;
    document.body.scrollTop = offsetPosition; // For Safari
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      id: user.uid,
      picture: user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
    scrollToBottom();
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat_header_info">
          <h3>{roomName}</h3>
          {messages.length !== 0 ? (
            <p>
              Last seen{" "}
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}
            </p>
          ) : (
            <></>
          )}
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
        <div ref={topOfChatRef}></div>
        {messages.map((message, key) => (
          <div
            key={key}
            className={`chat_body_message_container ${
              message?.id === user?.uid && "chat_body_sender"
            }`}
          >
            <Avatar src={message.picture} className={`chat_body_image`} />
            <p className={`chat_body_message`}>
              <span className="chat_body_name">{message.name}</span>
              {message.message}
              <span className="chat_body_timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          </div>
        ))}
        <div id="bottomScroll" ref={bottomOfChatRef}></div>
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
