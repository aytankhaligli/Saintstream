import SimpleSlider from "../../components/Slider";
import { Streamlist } from "../../data/constants";
import { fakeMovies } from "../../data/faker";
import StreamList from "../../components/cards/StreamList";
import MovieCard from "../../components/cards/MovieCard";
import ReleaseCard from "../../components/cards/ReleaseCard";
import WatchlistCard from "../../components/cards/WatchlistCard";
import SliderSection from "../../components/SliderSection";
import Hero from "../../components/Hero";
import { useEffect } from "react";
import { useState } from "react";
import { fetchData } from "../../data/fetch";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  console.log(movies);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData("/movie/popular?language=en-US&page=1", setMovies);
    fetchData("/trending/all/day?language=en-US'", setTrendingMovies);
    fetchData("/genre/movie/list?language=en", setGenres);
  }, []);

  return (
    <div>
      <SimpleSlider
        hasArrow={false}
        initialSlide={0}
        autoplay={true}
        data={movies.slice(0, 5)}
      >
        <Hero genres={genres} />
      </SimpleSlider>
      <SliderSection count={6} data={Streamlist} element={<StreamList />} />
      <SliderSection
        count={4}
        data={movies}
        title="Popular of the week"
        element={<MovieCard genres={genres} />}
      />
      <SliderSection
        count={4}
        data={trendingMovies}
        title="Just release"
        element={<ReleaseCard genres={genres} />}
      />
      <SliderSection
        count={4}
        data={fakeMovies}
        title="Your Watchlist"
        element={<WatchlistCard />}
      />
      <SliderSection
        count={4}
        data={fakeMovies}
        title="Your Likes"
        element={<WatchlistCard />}
      />
      {/* <SimpleSlider
        hasArrow={true}
        initialSlide={1}
        autoplay={false}
        data={movies.slice(-5)}
      >
        <Hero isExplore={true} />
      </SimpleSlider> */}
    </div>
  );
}
