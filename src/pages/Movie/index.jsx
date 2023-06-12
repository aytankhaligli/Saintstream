import { useParams } from "react-router-dom";
import Hero from "../../components/Hero";
import { fakeMovies } from "../../data/faker";
import styles from "./Movie.module.css";
import SliderSection from "../../components/SliderSection";
import Cast from "../../components/cards/Cast";
import Watchlist from "../../components/cards/WatchlistCard";
import Navbar from "../../components/Navbar";
import { Movies, anotherNav } from "../../data/constants";

export default function Movie() {
  const { movieId } = useParams();
  const [movie] = fakeMovies.filter((movie) => movieId === movie.id + "");

  return (
    <div>
      <Hero movie={movie} isMovie={true} />
      <div className={styles.aboutBox}>
        <h1>Story Line</h1>
        <p>{movie.description}</p>
      </div>
      <div className={styles.cast}>
        <SliderSection
          count={6}
          data={movie.cast}
          title="Top Cast"
          element={<Cast />}
        />
      </div>
      <div className={styles.navbar}>
        <Navbar items={anotherNav} />
      </div>
      <SliderSection
        count={4}
        data={Movies}
        title="Similar Movies for you"
        element={<Watchlist />}
      />
    </div>
  );
}
