import styles from "./SearchModal.module.css";
import searchIcon from "../../assets/icons/search.svg";

export default function SearchModal() {
  return (
    <div className={styles.searchBox}>
      <input placeholder="Search by genre,name,etc." className={styles.input} />
      <img src={searchIcon} alt="search-icon" />
    </div>
  );
}
