import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../../context/MovieContext";
import Watchlist from "../../components/cards/WatchlistCard";
import styles from "./Genres.module.css";

export default function Genres() {
  const { genreId } = useParams();
  const { sortbyGenre, moviesbyGenres, allGenres } = useContext(MovieContext);
  useEffect(() => {
    sortbyGenre(genreId);
  }, [genreId]);

  const genre =
    allGenres.length > 0 &&
    allGenres.filter((genre) => genre.id === +genreId)[0];

  console.log(genre);
  return (
    <div className={styles.container}>
      {genre ? (
        <>
          {" "}
          <h1>{genre.name}</h1>
          {moviesbyGenres.map((movie) => (
            <Watchlist key={movie.id} item={movie} />
          ))}
        </>
      ) : (
        <p className={styles.error}>Genre id is doesn't exist</p>
      )}
    </div>
  );
}
