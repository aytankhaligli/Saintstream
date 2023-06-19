import styles from "./MovieCard.module.css";
import Rate from "../../Rate";
import Categories from "../../Categories";
import filmIcon from "../../../assets/icons/film.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../../../context/MovieContext";

export default function MovieCard({ item, index }) {
  const { getMovieGenres, getPosterImg } = useContext(MovieContext);
  const movieGenres = getMovieGenres(item).slice(0, 3);

  return (
    <Link to={`/${item.id}`}>
      <div className={styles.card}>
        <div className={styles.number}>{index + 1}</div>
        <div className={styles.imageBox}>
          <img
            src={getPosterImg(item.backdrop_path)}
            alt=""
            className={styles.image}
          />
        </div>
        <div className={styles.description}>
          <div className={styles.subtitle}>PG-13</div>
          <h1 className={styles.title}>{item.title}</h1>
          <Categories categories={movieGenres} icon={filmIcon} />
          <div className={styles.rateBox}>
            <Rate rating={item.vote_average} />
            <p>Movie</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
