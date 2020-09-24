import React, { useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import "./Register.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [{}, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleRegistration = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          dispatch({
            type: actionTypes.SET_USER,
            user: auth.user,
          });

          auth.user.updateProfile({
            displayName: name,
          });

          console.log(auth.user);
          // history.push('/')
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register">
      <div className="register_container">
        <Avatar src="" alt="user profile pic" />
        <div className="register_text">
          <h1>Create your account</h1>
        </div>
        <form className="register_container_form">
          <h5>Username</h5>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
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
            className="register_sign_in_button"
            onClick={handleRegistration}
          >
            Register
          </button>
        </form>

        <div className="register_footer">
          <h4>Already have an account? </h4>
          <h4 id="login"> Login here</h4>
        </div>
      </div>
    </div>
  );
};

export default Register;
