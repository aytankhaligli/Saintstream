import logo from "../../assets/images/logo.png";
import searchIcon from "../../assets/icons/search.svg";
import bellIcon from "../../assets/icons/bell.svg";
import arrowIcon from "../../assets/icons/arrow.svg";
import Navbar from "../Navbar";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { navElements } from "../../data/constants";
import Dropdown from "../Dropdown";
import { useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import SearchModal from "../SearchModal";
import { ModalContext } from "../../context/ModalContext";
import { MovieContext } from "../../context/MovieContext";
import SearchingMovieCard from "../cards/SearchingMovieCard";

export default function Header() {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, profileObj } = useContext(LoginContext);
  const { isModalOpen, openModal, closeModal } = useContext(ModalContext);
  const { searchingMovies } = useContext(MovieContext);
  console.log(searchingMovies);

  useEffect(() => {
    const outsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
        closeModal();
      }
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
      <div className={styles.iconsContainer} ref={modalRef}>
        <img
          src={searchIcon}
          alt="search icon"
          className={styles.icon}
          onClick={openModal}
        />
        <img src={bellIcon} alt="search icon" className={styles.icon} />
        <div className={styles.profileContainer}>
          {isLoggedIn && (
            <div className={styles.profile}>
              <img src={profileObj.picture} alt="" />
            </div>
          )}
          <img
            src={arrowIcon}
            alt="search icon"
            className={styles.icon}
            onClick={() => setIsOpen((pre) => !pre)}
          />
        </div>
        {isOpen && <Dropdown />}
        {isModalOpen && (
          <div className={styles.searchBox}>
            <SearchModal />
            {searchingMovies.length > 0 && (
              <div className={styles.resultsContainer}>
                {searchingMovies.map((item) => (
                  <SearchingMovieCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
