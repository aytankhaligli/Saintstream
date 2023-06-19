import { Link } from "react-router-dom";
import Categories from "../../Categories";
import Rate from "../../Rate";
import styles from "./ReleaseCard.module.css";
import { useContext } from "react";
import { MovieContext } from "../../../context/MovieContext";
export default function ReleaseCard({ item }) {
  const { getMovieGenres, getPosterImg } = useContext(MovieContext);
  const movieGenres = getMovieGenres(item).slice(0, 2);
  return (
    <Link to={`/${item.id}`}>
      <div className={styles.card}>
        <img
          src={getPosterImg(item.backdrop_path)}
          alt=""
          className={styles.image}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{item.name ? item.name : item.title}</h1>
          <div className={styles.ratingBox}>
            <Rate rating={item.vote_average} media_type={item.media_type} />
            <Categories categories={movieGenres} />
          </div>
        </div>
      </div>
    </Link>
  );
}
