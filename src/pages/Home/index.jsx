import SimpleSlider from "../../components/Slider";
import { Streamlist } from "../../data/constants";
import { fakeMovies } from "../../data/faker";
import StreamList from "../../components/cards/StreamList";
import MovieCard from "../../components/cards/MovieCard";
import ReleaseCard from "../../components/cards/ReleaseCard";
import WatchlistCard from "../../components/cards/WatchlistCard";
import SliderSection from "../../components/SliderSection";
import Hero from "../../components/Hero";
import { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { MovieContext } from "../../context/MovieContext";
import ScrollToTop from "../../helpers/ScrollToTop";
import MultipleItems from "../../components/Slider/MultiItems";
import GenreCard from "../../components/cards/GenreCard";
import styles from "./Home.module.css";

export default function Home() {
  const { isLoggedIn } = useContext(LoginContext);
  const { popularMovies, trendingAll, allGenres, watchlist } =
    useContext(MovieContext);
  return (
    <div>
      <ScrollToTop />
      <SimpleSlider
        hasArrow={false}
        initialSlide={0}
        autoplay={true}
        data={popularMovies.slice(0, 5)}
      >
        <Hero isHomePage={true} />
      </SimpleSlider>
      <SliderSection count={6} data={Streamlist} element={<StreamList />} />
      <SliderSection
        count={4}
        data={popularMovies}
        title="Popular of the week"
        element={<MovieCard />}
      />
      <SliderSection
        count={4}
        data={trendingAll}
        title="Just release"
        element={<ReleaseCard />}
      />
      {isLoggedIn && (
        <>
          <SliderSection
            count={watchlist.length < 4 ? watchlist.length : 4}
            data={watchlist}
            title="Your Watchlist"
            element={<WatchlistCard />}
          />
          <SliderSection
            count={4}
            data={fakeMovies}
            title="Your Likes"
            element={<WatchlistCard />}
          />
        </>
      )}

      <SimpleSlider
        hasArrow={true}
        initialSlide={1}
        autoplay={false}
        data={popularMovies.slice(-5)}
      >
        <Hero isExplore={true} />
      </SimpleSlider>

      <div className={styles.genres}>
        <MultipleItems count={6} data={allGenres} isCast={true}>
          <GenreCard />
        </MultipleItems>
      </div>
    </div>
  );
}
