import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import axios from "./axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  // useEffect(() => {
  //   axios.get("/api/v1/messages/sync").then((response) => {
  //     setMessages(response.data);
  //   });
  // }, []);

  useEffect(() => {
    const pusher = new Pusher("19fb4f7af6acd518eb1f", {
      cluster: "us2",
    });
    const channel = pusher.subscribe("messages");

    channel.bind("inserted", (data) => {
      setMessages([...messages, data]);
    });

    // Clean up
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Switch>
              <Sidebar />

              <Route path="/rooms/:roomId">
                <Chat />
              </Route>

              <Route path="/"></Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
