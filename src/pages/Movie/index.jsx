import { useParams } from "react-router-dom";
import Hero from "../../components/Hero";
import styles from "./Movie.module.css";
import SliderSection from "../../components/SliderSection";
import Cast from "../../components/cards/Cast";
import Watchlist from "../../components/cards/WatchlistCard";
import Navbar from "../../components/Navbar";
import { anotherNav } from "../../data/constants";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";

export default function Movie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState("");
  const [similarMovies, setSimilarMovies] = useState([]);
  const { fetchData } = useContext(MovieContext);

  useEffect(() => {
    fetchData(`movie/${movieId}`, setMovie, "movie");
    fetchData(`movie/${movieId}/similar`, setSimilarMovies);
  }, [movieId]);

  console.log(similarMovies);

  return (
    <div>
      <Hero movie={movie} isMovie={true} />
      <div className={styles.aboutBox}>
        <h1>Story Line</h1>
        <p>{movie.overview}</p>
      </div>
      <div className={styles.cast}>
        {/* <SliderSection
          count={6}
          data={movie.cast}
          title="Top Cast"
          element={<Cast />}
        /> */}
      </div>
      <div className={styles.navbar}>
        <Navbar items={anotherNav} />
      </div>
      <SliderSection
        count={4}
        data={similarMovies}
        title="Similar Movies for you"
        element={<Watchlist />}
      />
    </div>
  );
}
