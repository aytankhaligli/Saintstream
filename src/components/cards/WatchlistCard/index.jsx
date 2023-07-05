import { Link } from "react-router-dom";
import Categories from "../../Categories";
import Rate from "../../Rate";
import styles from "./Watchlist.module.css";
import { useContext } from "react";
import { MovieContext } from "../../../context/MovieContext";

export default function Watchlist({ item, type }) {
  const { getPosterImg, getMovieGenres, allGenres } = useContext(MovieContext);
  return (
    <Link to={`/${item.id}`}>
      <div className={styles.card}>
        <div className={styles.image}>
          <img
            src={
              type === "people"
                ? getPosterImg(item.profile_path)
                : getPosterImg(item.poster_path)
            }
            alt=""
          />
        </div>
        <h1 className={styles.title}>{item.title ? item.title : item.name}</h1>
        {type === "people" ? (
          <div className={styles.ratingBox}>
            {item.known_for.map((movie, index) => (
              <p key={movie.id} className={styles.movie}>
                {movie.original_name
                  ? movie.original_name
                  : movie.original_title}
                ,
              </p>
            ))}
          </div>
        ) : (
          <div className={styles.ratingBox}>
            <Rate rating={item.vote_average} />
            {!item.categories && (
              <Categories categories={getMovieGenres(item)} />
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
