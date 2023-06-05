import SimpleSlider from "../../components/Slider";
import styles from "./Home.module.css";
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

export default function Home() {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  return (
    <div>
      <SimpleSlider hasArrow={false} initialSlide={0} autoplay={true}>
        <Hero width={windowSize.innerWidth} />
      </SimpleSlider>
      <SliderSection
        count={windowSize.innerWidth < 500 ? 4 : 6}
        data={Streamlist}
        element={<StreamList />}
      />
      <SliderSection
        count={windowSize.innerWidth < 500 ? 1 : 4}
        data={fakeMovies}
        title="Popular of the week"
        element={<MovieCard />}
      />
      <SliderSection
        count={windowSize.innerWidth < 500 ? 1 : 4}
        data={fakeMovies}
        title="Just release"
        element={<ReleaseCard />}
      />
      <SliderSection
        count={windowSize.innerWidth < 500 ? 1 : 4}
        data={fakeMovies}
        title="Your Watchlist"
        element={<WatchlistCard />}
      />
      <SliderSection
        count={windowSize.innerWidth < 500 ? 1 : 4}
        data={fakeMovies}
        title="Your Likes"
        element={<WatchlistCard />}
      />
      <SimpleSlider hasArrow={true} initialSlide={1} autoplay={false}>
        <Hero isExplore={true} />
      </SimpleSlider>
    </div>
  );
}
