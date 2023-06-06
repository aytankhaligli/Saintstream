import logo from "../../assets/images/logo.png";
import searchIcon from "../../assets/icons/search.svg";
import bellIcon from "../../assets/icons/bell.svg";
import arrowIcon from "../../assets/icons/arrow.svg";
import Navbar from "../Navbar";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { navElements } from "../../data/constants";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.logo} />
        </Link>
      </div>
      <Navbar items={navElements} />
      <div className={styles.iconsContainer}>
        <img src={searchIcon} alt="search icon" className={styles.icon} />
        <img src={bellIcon} alt="search icon" className={styles.icon} />
        <div className={styles.profileContainer}>
          <div className={styles.profile}></div>
          <img src={arrowIcon} alt="search icon" className={styles.icon} />
        </div>
      </div>
    </header>
  );
}
