import { useContext, useEffect, useState } from "react";
import Hero from "../../components/Hero";
import SimpleSlider from "../../components/Slider";
import { MovieContext } from "../../context/MovieContext";
import SliderSection from "../../components/SliderSection";
import { Streamlist } from "../../data/constants";
import StreamList from "../../components/cards/StreamList";
import ReleaseCard from "../../components/cards/ReleaseCard";
import MovieCard from "../../components/cards/MovieCard";
import WatchlistCard from "../../components/cards/WatchlistCard";
import ScrollToTop from "../../helpers/ScrollToTop";
import { LoginContext } from "../../context/LoginContext";

export default function Discover() {
  const { popularMovies, trendingAll, movies, series, getCast } =
    useContext(MovieContext);
  const { userWatchlist, userLikes } = useContext(LoginContext);
  const [moviesData, setMoviesData] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [selectedMovieCast, setSelectedMovieCast] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  useEffect(() => {
    setMoviesData([...userWatchlist, ...userLikes]);
  }, [userWatchlist, userLikes]);

  const calculateMovieSimilarities = (selectedMovie) => {
    // console.log(selectedMovieCast);
    const similarityScores =
      movies &&
      movies.map((movie) => {
        const movieId = movie.id;
        getCast(movieId, setMovieCast);

        const genresSimilarity = calculateSimilarity(
          selectedMovie.genres.map((mov) => mov.id),
          movie.genres ? movie.genres : movie.genre_ids
        );

        // const actorsSimilarity = calculateSimilarity(
        //   selectedMovie.actors,
        //   movie.actors
        // );

        const releaseDateSimilarity = calculateReleaseDateSimilarity(
          selectedMovie.release_date,
          movie.release_date
        );
        const reviewsSimilarity = calculateReviewsSimilarity(
          selectedMovie.reviews,
          movie.reviews
        );
        const languageSimilarity = calculateLanguageSimilarity(
          selectedMovie.language,
          movie.language
        );

        const overallSimilarity =
          (genresSimilarity +
            // actorsSimilarity +
            releaseDateSimilarity +
            // reviewsSimilarity +
            languageSimilarity) /
          3;
        // console.log(overallSimilarity);
        return {
          ...movie,
          similarityScore: overallSimilarity,
        };
      });

    const recommended = similarityScores.sort(
      (a, b) => b.similarityScore - a.similarityScore
    );
    setRecommendedMovies(recommended.slice(1, 11));
  };

  useEffect(() => {
    movies && moviesData.map((mov) => calculateMovieSimilarities(mov));
  }, [moviesData, movies, userWatchlist, userLikes]);

  const calculateSimilarity = (set1, set2) => {
    // console.log(set1, set2);

    const intersection = new Set(set1.filter((item) => set2.includes(item)));
    const union = new Set([...set1, ...set2]);
    const similarityScore = intersection.size / union.size;
    return similarityScore;
  };

  const calculateReleaseDateSimilarity = (date1, date2) => {
    const year1 = date1.slice(0, 4);
    const year2 = date2.slice(0, 4);
    const isSameYear = year1 === year2;
    return isSameYear ? 1 : 0;
  };

  const calculateReviewsSimilarity = (reviews1, reviews2) => {};

  const calculateLanguageSimilarity = (language1, language2) => {
    const isSameLanguage = language1 === language2;
    return isSameLanguage ? 1 : 0;
  };
  return (
    <div>
      <ScrollToTop />
      <SimpleSlider
        hasArrow={false}
        initialSlide={0}
        autoplay={true}
        data={popularMovies.slice(10, 15)}
      >
        <Hero />
      </SimpleSlider>
      <SliderSection count={6} data={Streamlist} element={<StreamList />} />
      <SliderSection
        count={4}
        data={recommendedMovies}
        title="Recommended"
        element={<ReleaseCard />}
      />
      <SliderSection
        count={4}
        data={trendingAll}
        title="Just release"
        element={<ReleaseCard />}
      />
      <SliderSection
        count={4}
        data={popularMovies}
        title="Popular of the week"
        element={<MovieCard />}
      />
      <SliderSection
        count={4}
        data={movies}
        title="Movies"
        element={<WatchlistCard />}
      />
      <SliderSection
        count={4}
        data={series}
        title="Series"
        element={<WatchlistCard />}
      />
      <SimpleSlider
        hasArrow={false}
        initialSlide={0}
        autoplay={false}
        data={popularMovies.slice(10, 15)}
      >
        <Hero isExplore={true} />
      </SimpleSlider>
    </div>
  );
}
