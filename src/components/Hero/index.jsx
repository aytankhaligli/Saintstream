import styles from "./Hero.module.css";
import Button from "../Button";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import playIcon from "../../assets/icons/play.svg";
import outlinePlayIcon from "../../assets/icons/play_outline.svg";
import downloadIcon from "../../assets/icons/download.svg";
import likeIcon from "../../assets/icons/thumb-up.svg";
import shareIcon from "../../assets/icons/share.svg";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import SliderSection from "../SliderSection";
import GenreCard from "../cards/GenreCard";
import MultipleItems from "../Slider/MultiItems";

export default function Hero({
  movie,
  isExplore = false,
  isHomePage = false,
  isMoviePage = false,
  isMovie,
}) {
  const { getPosterImg, allGenres, getMovieGenres } = useContext(MovieContext);

  const [width, setWidth] = useState("");
  const movieTime =
    Math.floor(movie.runtime / 60) + "h" + (movie.runtime % 60) + "m";
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
  console.log(movie);
  console.log(allGenres);
  return (
    <Link to={!isMovie && `/${movie.id}`}>
      <div
        className={
          isExplore ? [styles.hero, styles.height].join(" ") : styles.hero
        }
      >
        <div className={styles.overlay}></div>
        <div className={styles.image}>
          <img src={getPosterImg(movie.poster_path)} alt="" />
        </div>
        <div className={styles.season}>
          {!isExplore &&
            (!movie.seasons
              ? "Movie"
              : movie.seasons[movie.seasons.length - 1].name)}
          {isExplore && "Explore by the genre"}
        </div>
        <h1 className={styles.title}>
          {movie.title ? movie.title : movie.name}
        </h1>
        <p className={styles.subtitle}>
          {movie.runtime && movieTime + "•"}
          {movie.release_date && movie.release_date.slice(0, 4)}
          {movie.first_air_date && movie.first_air_date.slice(0, 4)}

          {/*  //! I have Problem here only movie Page i take an error from getMovieGenres, because i dont have allGenres */}
          {/* {movie.genres
            ? movie.genres.map((genre) => ` • ${genre.name}`)
            : genres.map((genre) => ` • ${genre.name}`)} */}
        </p>
        {!isExplore && isHomePage && (
          <p className={styles.text}>
            {movie.overview && width > 500
              ? movie?.overview
              : movie?.overview.slice(0, 120) + "..."}
            <span className={styles.more}>Read more</span>
          </p>
        )}
        <div className={styles.buttons}>
          <div className={styles.buttonsContainer}>
            <div className={styles.hidden}>
              <Button
                text="Play Now"
                icon={playIcon}
                style={{
                  backgroundColor: "#00925D",
                }}
              />
            </div>

            {isHomePage && (
              <Button
                text="Watch Trailer"
                icon={outlinePlayIcon}
                style={{ backgroundColor: "#28262D" }}
              />
            )}

            <Button
              text="Add Watchlist"
              icon={bookmarkIcon}
              style={{ border: "1px solid #FFFFFF" }}
            />
          </div>
          {isMoviePage && (
            <div className={styles.buttonsContainer}>
              <Button
                text="Download"
                icon={downloadIcon}
                style={{
                  backgroundColor: "#0D0C0F",
                  border: "1px solid #28262D",
                }}
              />
              <Button
                text="Share"
                icon={shareIcon}
                style={{
                  backgroundColor: "#0D0C0F",
                  border: "1px solid #28262D",
                }}
              />
              <Button
                text="Like"
                icon={likeIcon}
                style={{
                  backgroundColor: "#0D0C0F",
                  border: "1px solid #28262D",
                }}
              />
            </div>
          )}
        </div>
        {isExplore && (
          <div className={styles.genres}>
            <MultipleItems count={6} data={allGenres}>
              <GenreCard />
            </MultipleItems>
          </div>
        )}
      </div>
    </Link>
  );
}
