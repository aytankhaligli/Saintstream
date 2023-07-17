import styles from "./Hero.module.css";
import Button from "../Button";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import bookmarkFill from "../../assets/icons/bookmark-fill.svg";
import playIcon from "../../assets/icons/play.svg";
import outlinePlayIcon from "../../assets/icons/play_outline.svg";
import downloadIcon from "../../assets/icons/download.svg";
import likeIcon from "../../assets/icons/thumb-up.svg";
import unlikeIcon from "../../assets/icons/thumbs-down.svg";
import shareIcon from "../../assets/icons/share.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MovieContext } from "../../context/MovieContext";
import { ModalContext } from "../../context/ModalContext";
import { LoginContext } from "../../context/LoginContext";

export default function Hero({
  movie,
  isExplore = false,
  isHomePage = false,
  isMoviePage = false,
  isMovie,
  width,
}) {
  const { getPosterImg, getMovieGenres, getVideos, video } = useContext(MovieContext);
  const {
    userWatchlist,
    userLikes,
    addList,
    removeList,
    isLoggedIn,
    setWatchlist,
    setLikes,
  } = useContext(LoginContext);
  const { isModalOpen } = useContext(ModalContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const movieTime =
    Math.floor(movie.runtime / 60) + "h" + (movie.runtime % 60) + "m";

  const linkClicked = (e) => {
    if (!isMovie) navigate(`/${movie.id}`);
  };

  const watchListClicked = (e) => {
    e.stopPropagation();
    userWatchlist.some((mov) => mov.id === movie.id)
      ? removeList(movie, "watchlist", setWatchlist)
      : addList(movie, "watchlist", setWatchlist);
  };
  function watch(e) {
    e.stopPropagation();
    getVideos(movie.id);
    setShowModal(true);
    console.log(video);

    // navigate(`/video`);
  }

  return (
    <div onClick={linkClicked}>
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
                onClick={watch}
              />
            </div>

            {isHomePage && (
              <Button
                text="Watch Trailer"
                icon={outlinePlayIcon}
                style={{ backgroundColor: "#28262D" }}
                onClick={watch}
              />
            )}
            {isLoggedIn && (
              <Button
                text={
                  userWatchlist.some((mov) => mov.id === movie.id)
                    ? "Remove Watchlist"
                    : "Add Watchlist"
                }
                icon={
                  userWatchlist.some((mov) => mov.id === movie.id)
                    ? bookmarkFill
                    : bookmarkIcon
                }
                style={{ border: "1px solid #FFFFFF" }}
                isMoviePageIcon={true}
                onClick={watchListClicked}
              />
            )}
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
              {isLoggedIn && (
                <Button
                  text={
                    userLikes.some((mov) => mov.id === movie.id)
                      ? "Unlike"
                      : "Like"
                  }
                  icon={
                    userLikes.some((mov) => mov.id === movie.id)
                      ? unlikeIcon
                      : likeIcon
                  }
                  style={{
                    backgroundColor: "#0D0C0F",
                    border: "1px solid #28262D",
                  }}
                  isMoviePageIcon={true}
                  onClick={() =>
                    userLikes.some((mov) => mov.id === movie.id)
                      ? removeList(movie, "likes", setLikes)
                      : addList(movie, "likes", setLikes)
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
      {
        showModal && <div className={styles.absolute}>
          {
            video && video.map((vid, index) => (
              index === 0 && <div key={vid.id} style={{ height: '100%' }}>
                <iframe src={`https://www.youtube.com/embed/${vid.key}`} title={vid.name} width="100%" height="100%"></iframe>
              </div>
            ))
          }

          {/* <iframe src={`https://www.youtube.com/embed/OW1mU4vBBEU`} title="something"></iframe> */}
        </div>
      }
    </div>
  );
}
