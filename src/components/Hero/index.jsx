import styles from "./Hero.module.css";
import Button from "../Button";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import playIcon from "../../assets/icons/play.svg";
import outlinePlayIcon from "../../assets/icons/play_outline.svg";
import downloadIcon from "../../assets/icons/download.svg";
import likeIcon from "../../assets/icons/thumb-up.svg";
import shareIcon from "../../assets/icons/share.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import GenreCard from "../cards/GenreCard";
import MultipleItems from "../Slider/MultiItems";
import { ModalContext } from "../../context/ModalContext";

export default function Hero({
  movie,
  isExplore = false,
  isHomePage = false,
  isMoviePage = false,
  isMovie,
  width,
}) {
  const { getPosterImg, allGenres, getMovieGenres } = useContext(MovieContext);
  const { isModalOpen } = useContext(ModalContext);

  const movieTime =
    Math.floor(movie.runtime / 60) + "h" + (movie.runtime % 60) + "m";

  return (
    <Link to={!isMovie && `/${movie.id}`}>
      <div
        className={
          isExplore ? [styles.hero, styles.height].join(" ") : styles.hero
        }
        style={{ filter: isModalOpen && "blur(4px" }}
      >
        <div className={styles.overlay}></div>
        <div className={styles.image}>
          <img src={getPosterImg(movie.poster_path)} alt="" />
        </div>
        <div className={styles.season}>
          {!isExplore &&
            (!movie?.seasons?.length > 0
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
          {movie.genres
            ? movie.genres.map((genre) => ` • ${genre.name}`)
            : getMovieGenres(movie).map((genre) => ` • ${genre.name}`)}
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
            <div className={styles}>
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
              isMoviePageIcon={true}
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
                isMoviePageIcon={true}
              />
              <Button
                text="Share"
                icon={shareIcon}
                style={{
                  backgroundColor: "#0D0C0F",
                  border: "1px solid #28262D",
                }}
                isMoviePageIcon={true}
              />
              <Button
                text="Like"
                icon={likeIcon}
                style={{
                  backgroundColor: "#0D0C0F",
                  border: "1px solid #28262D",
                }}
                isMoviePageIcon={true}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
