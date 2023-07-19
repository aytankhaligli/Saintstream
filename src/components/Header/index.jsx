import logo from "../../assets/images/logo.png";
import searchIcon from "../../assets/icons/search.svg";
import bellIcon from "../../assets/icons/bell.svg";
import arrowIcon from "../../assets/icons/arrow.svg";
import Navbar from "../Navbar";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { navElements } from "../../data/constants";
import Dropdown from "../Dropdown";
import { useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { ModalContext } from "../../context/ModalContext";
import Search from "../Search/Search";

export default function Header() {
  // const modalRef = useRef(null);
  const location = useLocation();

  const { isLoggedIn, profileObj } = useContext(LoginContext);
  const { isModalOpen, openModal, closeModal, modalRef, isDropdownOpen } =
    useContext(ModalContext);

  // useEffect(() => {
  //   const outsideClick = (e) => {
  //     if (modalRef.current && !modalRef.current.contains(e.target)) {
  //       setIsOpen(false);
  //       closeModal();
  //     }
  //   };

  //   document.addEventListener("click", outsideClick);

  //   return () => {
  //     document.removeEventListener("click", outsideClick);
  //   };
  // }, []);

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.logo} />
        </Link>
      </div>
      <Navbar items={navElements} />
      <div className={styles.iconsContainer} ref={modalRef}>
        {location.pathname !== "/popular-people" && (
          <img
            src={searchIcon}
            alt="search icon"
            className={styles.icon}
            onClick={(e) => openModal()}
          />
        )}

        <img src={bellIcon} alt="search icon" className={styles.icon} />
        <div className={styles.profileContainer}>
          {isLoggedIn && (
            <div className={styles.profile}>
              <img src={profileObj.picture} alt="" />
            </div>
          )}
          <img
            src={arrowIcon}
            alt="arrow icon"
            className={styles.icon}
            onClick={(e) => openModal("dropdown")}
          />
        </div>
        {isDropdownOpen && <Dropdown />}
        {isModalOpen && <Search />}
      </div>
    </header>
  );
}
