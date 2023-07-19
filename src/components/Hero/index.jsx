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
import facebookIcon from "../../assets/icons/Facebook.svg";
import twitterIcon from "../../assets/icons/Twitter.svg";
import googleIcon from "../../assets/icons/Google.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/MovieContext";
import { ModalContext } from "../../context/ModalContext";
import { LoginContext } from "../../context/LoginContext";
import { useRef } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

export default function Hero({
  movie,
  isExplore = false,
  isHomePage = false,
  isMoviePage = false,
  isMovie,
  width,
}) {
  const { getPosterImg, getMovieGenres, getVideos } = useContext(MovieContext);
  const [copySuccess, setCopySuccess] = useState("");
  const {
    userWatchlist,
    userLikes,
    addList,
    removeList,
    isLoggedIn,
    setWatchlist,
    setLikes,
  } = useContext(LoginContext);
  const { isModalOpen, shareModal, openModal, modalRef } =
    useContext(ModalContext);
  const navigate = useNavigate();
  // const modalRef = useRef(null);

  const movieTime =
    Math.floor(movie.runtime / 60) + "h" + (movie.runtime % 60) + "m";

  const linkClicked = (e) => {
    if (!isMovie) navigate(`/${movie.id}`);
  };
  function copyToClipboard() {
    navigator.clipboard.writeText(movie.homepage);
    setCopySuccess("Copied!");
  }
  useEffect(() => {
    setTimeout(() => {
      setCopySuccess(false);
    }, 1000);
  }, [copySuccess]);

  const watchListClicked = (e) => {
    e.stopPropagation();
    userWatchlist.some((mov) => mov.id === movie.id)
      ? removeList(movie, "watchlist", setWatchlist)
      : addList(movie, "watchlist", setWatchlist);
  };
  function watch(e) {
    e.stopPropagation();
    getVideos(movie.id);
    navigate(`/video`);
  }
  function share(e) {
    e.stopPropagation();
    openModal("share");
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
                onClick={share}
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
              {shareModal && (
                <div className={styles.absolute}>
                  <div className={styles.inputBox}>
                    <input value={movie.homepage} readOnly />
                    <Button
                      text="Kopyala"
                      style={{
                        backgroundColor: "#00925D",
                      }}
                      onClick={copyToClipboard}
                    />
                    {copySuccess && (
                      <div className={styles.copy}>{copySuccess}</div>
                    )}
                  </div>
                  <div className={styles.icons}>
                    <FacebookShareButton
                      url={movie.homepage}
                      quote={movie.title}
                      hashtag={`#${movie.title}`}
                    >
                      <FacebookIcon size={54} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={movie.homepage}
                      quote={movie.title}
                      hashtag={`#${movie.title}`}
                    >
                      <TwitterIcon size={54} round />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      url={movie.homepage}
                      quote={movie.title}
                      hashtag={`#${movie.title}`}
                    >
                      <WhatsappIcon size={54} round />
                    </WhatsappShareButton>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
