import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "./Login.module.css";
import AuthContainer from "../../components/Auth";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { auth } from "../../firebase";
import facebookIcon from "../../assets/icons/Facebook.svg";

import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";

const appId = "143428682080487";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { login, isLoggedIn, handleChange, inputError } =
    useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    email !== "" && password !== "" && setDisabled(false);
    (email === "" || password === "") && setDisabled(true);
    inputError && setDisabled(true);
  }, [email, password]);

  const onSuccess = (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    login(decoded);
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const handleFacebookLogin = (response) => {
    console.log(response);
    login({
      displayName: response.name,
      photoURL: response.picture.data.url,
      uid: response.id,
    });
  };

  const facebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const componentClicked = (data) => {
    console.warn(data);
  };

  function signIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        login(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <AuthContainer>
      <form className={styles.form}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            handleChange(e, setEmail, "Please type correct email")
          }
        />
        {inputError && <p className={styles.errorText}>{inputError}</p>}

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link className={styles.link} to="/forget">
          Forget Password
        </Link>
        <Button
          text="Login"
          style={{
            backgroundColor: "#fff",
            color: disabled ? "#aaa" : "#000",
            cursor: disabled && "not-allowed",
          }}
          onClick={signIn}
        />
      </form>
      <div className={styles.google}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        {/* <FacebookLogin
          appId={appId}
          autoLoad={true}
          fields="name,email,picture"
          callback={handleFacebookLogin}
          onClick={componentClicked}
          render={(renderProps) => (
            <button onClick={renderProps.onClick} className={styles.facebook}>
              Sign in with Facebook
            </button>
          )}
        /> */}
        <button onClick={facebookLogin}>Facebook login</button>
      </div>
    </AuthContainer>
  );
}
