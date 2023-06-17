import logo from "../../assets/images/logo.png";
import searchIcon from "../../assets/icons/search.svg";
import bellIcon from "../../assets/icons/bell.svg";
import arrowIcon from "../../assets/icons/arrow.svg";
import Navbar from "../Navbar";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { navElements } from "../../data/constants";
import Dropdown from "../Dropdown";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const outsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("click", outsideClick);

    return () => {
      document.removeEventListener("click", outsideClick);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.logo} />
        </Link>
      </div>
      <Navbar items={navElements} />
      <div className={styles.iconsContainer} ref={dropdownRef}>
        <img src={searchIcon} alt="search icon" className={styles.icon} />
        <img src={bellIcon} alt="search icon" className={styles.icon} />
        <div className={styles.profileContainer}>
          <div className={styles.profile}></div>
          <img
            src={arrowIcon}
            alt="search icon"
            className={styles.icon}
            onClick={() => setIsOpen((pre) => !pre)}
          />
        </div>
        {isOpen && <Dropdown />}
      </div>
    </header>
  );
}
