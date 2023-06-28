import { useContext, useEffect, useState } from "react";
import AuthContainer from "../../components/Auth";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./Signup.module.css";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [error, setError] = useState(null);
  const { inputError, handleChange, signup, isLoggedIn } =
    useContext(LoginContext);

  function passwordOnChange(e) {
    setSecondPassword(e.target.value);
    secondPassword !== password
      ? setError("Please repeat your password")
      : setError(null);
  }
  const navigate = useNavigate();

  useEffect(() => {
    email !== "" &&
      password !== "" &&
      secondPassword !== "" &&
      username !== "" &&
      isChecked &&
      !error &&
      setDisabled(false);
    (email === "" ||
      password === "" ||
      secondPassword === "" ||
      username === "" ||
      !isChecked ||
      error) &&
      setDisabled(true);
    inputError && setDisabled(true);
  }, [email, password, secondPassword, inputError, username, error, isChecked]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);
  return (
    <AuthContainer type="signup">
      <form>
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Email"
          onChange={(e) =>
            handleChange(e, email, setEmail, "Please type correct email")
          }
        />
        {inputError && <p className={styles.errorText}>{inputError}</p>}
        <Input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input placeholder="Password" onChange={passwordOnChange} />
        {error && <p className={styles.errorText}>{error}</p>}
        <div className={styles.checkbox_wrapper}>
          <input
            type="checkbox"
            className={isChecked ? styles.checked : ""}
            onChange={() => setIsChecked((pre) => !pre)}
          />
          <label>I agree to our Privacy Policy and Term & Conditions</label>
        </div>

        <Button
          text="Continue"
          style={{
            backgroundColor: "#fff",
            color: disabled ? "#aaa" : "#000",
            cursor: disabled && "not-allowed",
          }}
          onClick={() => signup(email, password, username)}
        />
      </form>
    </AuthContainer>
  );
}
