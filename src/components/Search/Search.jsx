import { useContext } from "react";
import Filter from "../Filter";
import SearchModal from "../SearchModal";
import SearchingMovieCard from "../cards/SearchingMovieCard";
import { MovieContext } from "../../context/MovieContext";
import styles from "./Search.module.css";

export default function Search() {
  const { searchingMovies } = useContext(MovieContext);
  return (
    <div className={styles.searchBox}>
      <SearchModal />
      <Filter />
      {searchingMovies.length > 0 && (
        <div className={styles.resultsContainer}>
          {searchingMovies.map((item) => (
            <SearchingMovieCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
