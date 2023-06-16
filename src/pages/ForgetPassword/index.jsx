import AuthContainer from "../../components/Auth";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "./ForgetPassword.module.css";

export default function ForgetPassword() {
  return (
    <AuthContainer>
      <form className={styles.form}>
        <p className={styles.title}>
          Please enter your email to search for your account
        </p>
        <Input type="text" placeholder="Email" />
        <Button
          text="Send"
          style={{ backgroundColor: "#fff", color: "#aaa" }}
        />
      </form>
    </AuthContainer>
  );
}
