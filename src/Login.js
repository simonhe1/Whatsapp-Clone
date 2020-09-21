import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signInWithEmailAndPassword = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      // Will update with display message in the future
      .catch((err) => console.log(err));
  };

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => console.log(err.message));
  };

  const register = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // It successfully created a new user with email and password
        if (auth) {
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          alt="whatsapp logo"
          src="https://seeklogo.net/wp-content/uploads/2018/10/whatsapp-logo.png"
        />
        <div className="login_text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <h5>Password</h5>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button
            type="submit"
            className="login_sign_in_button"
            onClick={signInWithEmailAndPassword}
          >
            Sign In
          </button>
        </form>

        <button
          className="login_register_email_and_pass_button"
          onClick={register}
        >
          Create your Whatsapp Account
        </button>

        <Button
          onClick={signInWithGoogle}
          className="login_register_google_button"
        >
          Sign In With Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
