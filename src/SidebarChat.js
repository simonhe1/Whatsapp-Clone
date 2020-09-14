import {
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from "./firebase";
import { Link } from "react-router-dom";

const SidebarChat = ({ id, name, addNewChat, seed }) => {
  const [messages, setMessages] = useState([]);
  const [openAddNewChat, setOpenAddNewChat] = useState(false);
  const [newChatName, setNewChatName] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const handleClose = () => {
    setOpenAddNewChat(false);
    setNewChatName("");
  };

  const createChat = () => {
    if (newChatName) {
      db.collection("rooms").add({
        name: newChatName,
        pictureSeed: Math.floor(Math.random() * 5000),
      });
      setNewChatName("");
    }
    setOpenAddNewChat(false);
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar_chat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebar_chat_info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <>
      <div onClick={() => setOpenAddNewChat(true)} className="sidebar_chat">
        <h2>Add New Chat</h2>
      </div>
      <Dialog open={openAddNewChat} onClose={handleClose}>
        <DialogTitle>New Chat</DialogTitle>
        <DialogContent>
          <DialogContentText>Add a name for the new chat</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Chat Name"
            type="text"
            fullWidth
            onChange={(e) => setNewChatName(e.target.value)}
            value={newChatName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createChat} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SidebarChat;
