import React, { useEffect, useState } from "react";
// import Pusher from "pusher-js";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
// import axios from "./axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { actionTypes } from "./reducer";

function App() {
  // const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [accessLoginPage, setAccessLoginPage] = useState(false);

  // useEffect(() => {
  //   axios.get("/api/v1/messages/sync").then((response) => {
  //     setMessages(response.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   const pusher = new Pusher("19fb4f7af6acd518eb1f", {
  //     cluster: "us2",
  //   });
  //   const channel = pusher.subscribe("messages");

  //   channel.bind("inserted", (data) => {
  //     setMessages([...messages, data]);
  //   });

  //   // Clean up
  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };
  // }, [messages]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // The user just logged in or the user was just logged in
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      } else {
        // The user is logged out
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const switchAccessLoginPage = (switchToLogin) => {
    setAccessLoginPage(switchToLogin);
  };

  return (
    <div className="app">
      <div className="app_body">
        <Router>
          <Switch>
            <Route path="/rooms/:roomId">
              <Sidebar />
              <Chat />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/">{user ? <Sidebar /> : <Login />}</Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
