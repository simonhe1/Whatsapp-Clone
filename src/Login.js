import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, GoogleProvider, FBProvider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { useHistory } from "react-router-dom";
import { Facebook } from "@material-ui/icons";

const Login = () => {
  const [, dispatch] = useStateValue();
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

  const signInWithFacebook = () => {
    auth
      .signInWithPopup(FBProvider)
      .then((auth) => {
        if (auth) {
          console.log(auth.user);
          dispatch({
            type: actionTypes.SET_USER,
            user: auth.user,
          });
          history.push("/");
        }
      })
      .catch((err) => console.log(err.message));
  };

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(GoogleProvider)
      .then((auth) => {
        if (auth) {
          dispatch({
            type: actionTypes.SET_USER,
            user: auth.user,
          });
          history.push("/");
        }
      })
      .catch((err) => console.log(err.message));
  };

  const switchToRegister = () => {
    setEmail("");
    setPassword("");
    // switchPage(false);
    history.push("/register");
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
        <form className="login_container_form">
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

          <h5 className="login_forgot_password_text">Forgot password?</h5>
          <button
            type="submit"
            className="login_sign_in_button"
            onClick={signInWithEmailAndPassword}
          >
            Login
          </button>
        </form>

        <div className="login_divider">
          <hr className="login_divider_bar" />
          <div className="login_divider_text">Or login with</div>
          <hr className="login_divider_bar" />
        </div>

        <div className="login_third_party_container">
          <Button onClick={signInWithFacebook} className="login_facebook">
            <Facebook color="primary" />
          </Button>
          <Button onClick={signInWithGoogle} className="login_google">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png"
              alt="Google Logo"
              className="login_google_icon"
            />
          </Button>
        </div>

        <div className="login_footer">
          <h4>New User? </h4>
          <h4 onClick={switchToRegister} id="sign_up">
            {" "}
            Sign up here
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Login;
