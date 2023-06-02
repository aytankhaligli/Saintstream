import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search.svg";
import bellIcon from "../../assets/bell.svg";
import arrowIcon from "../../assets/arrow.svg";
import Navbar from "../Navbar";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={styles.header}>
      <div>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <Navbar />
      <div className={styles.iconsContainer}>
        <img src={searchIcon} alt="search icon" className="icon" />
        <img src={bellIcon} alt="search icon" className="icon" />
        <div className={styles.profileContainer}>
          <div className={styles.profile}></div>
          <img src={arrowIcon} alt="search icon" className="icon" />
        </div>
      </div>
    </div>
  );
}
