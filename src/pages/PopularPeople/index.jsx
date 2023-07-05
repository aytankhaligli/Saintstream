import { useContext } from "react";
import Watchlist from "../../components/cards/WatchlistCard";
import styles from "./PopularPeople.module.css";
import { MovieContext } from "../../context/MovieContext";
import SearchModal from "../../components/SearchModal";
import Pagination from "../../components/Pagination";
export default function PopularPeople() {
  const { popularPeople, searchingPeople } = useContext(MovieContext);
  const people = searchingPeople.length > 0 ? searchingPeople : popularPeople;
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <SearchModal />
      </div>
      <div className={styles.grid}>
        {people.map((pers, index) => (
          <Watchlist item={pers} key={pers.id} type="people" />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
