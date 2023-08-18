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
import ScrollToTop from "../../helpers/ScrollToTop";
import Reviews from "../../components/Reviews";

export default function Movie() {
  const { movieId } = useParams();
  const [isMovie, setIsMovie] = useState(true);
  const [movie, setMovie] = useState("");
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const { fetchData, movies, series, getCast } = useContext(MovieContext);
  const [isMore, setIsMore] = useState(false);
  useEffect(() => {
    setIsMovie(movies.some((movie) => movie.id === +movieId));
    setIsMovie(!series.some((serie) => serie.id === +movieId));
  }, [movieId, movies, series]);

  const [width, setWidth] = useState("");
  function getWindowSize() {
    return window.innerWidth;
  }
  useEffect(() => {
    function handleWindowResize() {
      setWidth(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // console.log(cast);
  useEffect(() => {
    if (isMovie) {
      fetchData(`movie/${movieId}`, setMovie, "movie");
      // fetchData(`movie/${movieId}/credits`, setCast, "cast");
      getCast(movieId, setCast);
      fetchData(`movie/${movieId}/similar`, setSimilarMovies);
    } else {
      fetchData(`tv/${movieId}`, setMovie, "movie");
      fetchData(`tv/${movieId}/credits`, setCast, "cast");
      fetchData(`tv/${movieId}/similar`, setSimilarMovies);
    }
  }, [movieId, isMovie, fetchData]);

  return (
    <div>
      <ScrollToTop />
      <Hero movie={movie} isMovie={isMovie} isMoviePage={true} width={width} />
      <div className={styles.aboutBox}>
        <h1>Story Line</h1>
        <p>
          {movie.overview &&
            (width > 500
              ? movie.overview
              : isMore
              ? movie.overview
              : movie.overview.slice(0, 120) + "...")}
          {!isMore && (
            <span className={styles.more} onClick={() => setIsMore(true)}>
              More
            </span>
          )}
        </p>
      </div>
      <div className={styles.cast}>
        <SliderSection
          count={cast.length < 7 ? cast.length : 7}
          data={cast}
          title="Top Cast"
          element={<Cast />}
          isCast={true}
        />
      </div>
      <div className={styles.navbar}>
        <Navbar items={anotherNav} />
      </div>
      <SliderSection
        count={4}
        data={similarMovies}
        title={isMovie ? "Similar Movies for you" : "Similar Series for you"}
        element={<Watchlist />}
      />
      <Reviews movieId={movie.id} />
    </div>
  );
}
