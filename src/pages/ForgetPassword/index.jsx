import { useContext, useEffect, useState } from "react";
import AuthContainer from "../../components/Auth";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "./ForgetPassword.module.css";
import { LoginContext } from "../../context/LoginContext";

export default function ForgetPassword() {
  const { inputError, handleChange } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    email !== "" && setDisabled(false);
    email === "" && setDisabled(true);
    inputError && setDisabled(true);
  }, [email]);
  return (
    <AuthContainer>
      <form className={styles.form}>
        <p className={styles.title}>
          Please enter your email to search for your account
        </p>
        <Input
          type="text"
          placeholder="Email"
          onChange={(e) =>
            handleChange(
              e,
              email,
              setEmail,
              "Please type correct email address"
            )
          }
        />
        {inputError && <p className={styles.errorText}>{inputError}</p>}
        <Button
          text="Send"
          style={{
            backgroundColor: "#fff",
            color: disabled ? "#aaa" : "#000",
            cursor: disabled && "not-allowed",
          }}
        />
      </form>
    </AuthContainer>
  );
}
