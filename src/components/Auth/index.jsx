import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Button from "../../components/Button";
import styles from "./Auth.module.css";

export default function AuthContainer({ children, type }) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.header}>
          <div>
            <img src={logo} alt="logo" />
            <p>
              {type === "signup"
                ? "Register to enjoy the features"
                : "Login to your account"}
            </p>
          </div>
          <Button
            text="Close"
            style={{ border: "1px solid #28262d", backgroundColor: "#0d0c0f" }}
            onClick={() => navigate(-1)}
          />
        </div>
        {children}
        <div className={styles.footer}>
          {type === "signup" ? (
            <p>
              Already have an account ?<Link to="/login"> Login</Link>
            </p>
          ) : (
            <p>
              Don't have an account? <Link to="/signup"> Sign up</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
