import { useContext } from "react";
import styles from "./Dropdown.module.css";
import { LoginContext } from "../../context/LoginContext";
import { Link } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

export default function Dropdown() {
  const { isLoggedIn, profileObj, logout } = useContext(LoginContext);
  const signout = () => {
    logout();
    googleLogout();
  };
  return (
    <div className={styles.dropdown}>
      <p className={styles.title}>{profileObj.name}</p>
      <ul className={styles.menu}>
        {isLoggedIn ? (
          <>
            <Link to="/profile">
              <li>Profile</li>
            </Link>
            <Link to="/home">
              <li>Home</li>
            </Link>
            <Link to="/settings">
              <li>Settings</li>
            </Link>

            <li onClick={signout}>Sign out</li>
          </>
        ) : (
          <>
            <Link to="/login">
              <li>Login</li>
            </Link>
            <Link to="">
              <li>Home</li>
            </Link>
            <Link to="">
              <li>Settings</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}
