import { useContext } from "react";
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

export default function Discover() {
  const { popularMovies, trendingAll, movies, series } =
    useContext(MovieContext);
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
        data={trendingAll}
        title="Just release"
        element={<ReleaseCard />}
      />
      <div>Featured in Saintstream</div>
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
