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
import { getPosterImg } from "../../data/fetch";
import { Link } from "react-router-dom";

export default function Hero({ movie, isExplore = false, isMovie = false }) {
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
  return (
    <Link to={!isMovie && `/${movie.id}`}>
      <div className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.image}>
          <img src={getPosterImg(movie.poster_path)} alt="" />
        </div>
        <div className={styles.season}>
          {isExplore
            ? "Explore by the genre"
            : movie.season
            ? `Season ${movie.season}`
            : "Movie"}
        </div>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.subtitle}>
          {movie.runtime && movieTime} •{" "}
          {movie && movie.release_date.slice(0, 4)}
          {movie.genres && movie.genres.map((genre) => ` • ${genre.name}`)}
        </p>
        {!isExplore && !isMovie && (
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

            {!isExplore ||
              (!isMovie && (
                <Button
                  text="Watch Trailer"
                  icon={outlinePlayIcon}
                  style={{ backgroundColor: "#28262D" }}
                />
              ))}

            <Button
              text="Add Watchlist"
              icon={bookmarkIcon}
              style={{ border: "1px solid #FFFFFF" }}
            />
          </div>
          {isMovie && (
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
      </div>
    </Link>
  );
}
