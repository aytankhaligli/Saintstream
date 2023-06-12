import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "./Login.module.css";
import AuthContainer from "../../components/Auth";

export default function Login() {
  return (
    <AuthContainer>
      <form className={styles.form}>
        <Input type="text" placeholder="Email" />
        <Input type="text" placeholder="Password" />
        <Link className={styles.link} to="/forget">
          Forget Password
        </Link>
        <Button
          text="Login"
          style={{ backgroundColor: "#fff", color: "#aaa" }}
        />
      </form>
    </AuthContainer>
  );
}
