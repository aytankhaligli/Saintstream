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

const appId = "143428682080487";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const { login, isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    email !== "" && password !== "" && setDisabled(false);
    email === "" || (password === "" && setDisabled(true));
  }, [email, password]);

  const onSuccess = (credentialResponse) => {
    console.log(credentialResponse.credential);
    const decoded = jwt_decode(credentialResponse.credential);
    login(decoded);
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    validate(email) && setError(null);
  };
  const submit = () => {
    validate(email) ? setError(null) : setError("Please write correct email");
  };
  const validate = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleFacebookLogin = (response) => {
    console.log(response);
  };

  return (
    <AuthContainer>
      <form className={styles.form}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
        {error && <p className={styles.errorText}>{error}</p>}

        <Input
          type="text"
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
          onClick={submit}
        />
      </form>
      <div className={styles.google}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <FacebookLogin
          appId={appId}
          autoLoad={false}
          fields="name,email,picture"
          callback={handleFacebookLogin}
          render={(renderProps) => (
            <button onClick={renderProps.onClick} className={styles.facebook}>
              Sign in with Facebook
            </button>
          )}
        />
      </div>
    </AuthContainer>
  );
}
