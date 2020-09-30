import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import { actionTypes } from "./reducer";
import db, { auth, storage } from "./firebase";
import { useStateValue } from "./StateProvider";
import SidebarSettings from "./SidebarSettings";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );

      // Cleanup
      return () => {
        unsubscribe();
      };
    });
  }, []);

  const uploadUserPhoto = (event) => {
    const { files } = event.target;
    if (files && files[0]) {
      const pic = files[0];
      if (user) {
        const uploadTask = storage.ref(`images/${pic.name}`).put(pic);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (err) => console.log(err),
          () => {
            storage
              .ref("images")
              .child(pic.name)
              .getDownloadURL()
              .then((url) => {
                auth.currentUser.updateProfile({
                  photoURL: url,
                });
                // .then(() => {
                //   dispatch({
                //     type: actionTypes.SET_USER,
                //     user: auth.user,
                //   });
                // })
                // .catch((err) => console.log(err));
              });
          }
        );
      }
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <input
          type="file"
          accept="image/*"
          id="user_photo"
          onChange={uploadUserPhoto}
          hidden
        />
        <label htmlFor="user_photo">
          <Avatar
            src={user?.photoURL}
            className="sidebar_header_photo"
            onClick={(e) => console.log("hello")}
          />
        </label>
        <div className="sidebar_header_username">{user?.displayName}</div>
        <div className="sidebar_header_right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <SidebarSettings />
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_search_container">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat
            key={room.id}
            id={room.id}
            name={room.data.name}
            seed={room.data.pictureSeed}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
