import { useContext } from "react";
import styles from "./SearchingMovieCard.module.css";
import { MovieContext } from "../../../context/MovieContext";
import { Link } from "react-router-dom";
export default function SearchingMovieCard({ item }) {
  const { getPosterImg } = useContext(MovieContext);
  return (
    <Link to={`/${item.id}`}>
      <div className={styles.card}>
        <img
          src={getPosterImg(item.poster_path)}
          alt=""
          className={styles.image}
        />
        <div>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.date}>{item.release_date}</p>
          <p className={styles.text}>{item.overview}</p>
        </div>
      </div>
    </Link>
  );
}
