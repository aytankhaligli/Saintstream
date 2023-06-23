import styles from "./SearchModal.module.css";
import searchIcon from "../../assets/icons/search.svg";
import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";

export default function SearchModal() {
  const { search } = useContext(MovieContext);
  return (
    <div className={styles.searchBox}>
      <input
        placeholder="Search by name"
        className={styles.input}
        onChange={(e) => search(e.target.value)}
      />
      <img src={searchIcon} alt="search-icon" />
    </div>
  );
}
