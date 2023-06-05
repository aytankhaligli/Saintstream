import styles from "./Hero.module.css";
import Button from "../Button";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import playIcon from "../../assets/icons/play.svg";
import outlinePlayIcon from "../../assets/icons/play_outline.svg";

export default function Hero({ movie, isExplore, width }) {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.image}>
        <img src={movie.image} alt="" />
      </div>
      <div className={styles.season}>
        {isExplore
          ? "Explore by the genre"
          : movie.season
          ? `Season ${movie.season}`
          : "Movie"}
      </div>
      <h1 className={styles.title}>{movie.name}</h1>
      <p className={styles.subtitle}>
        {movie.time} • {movie.year} {movie.category.map((cat) => ` • ${cat}`)}
      </p>
      {!isExplore && (
        <p className={styles.text}>
          {width > 500
            ? movie.description
            : movie.description.slice(0, 120) + "..."}
          <span className={styles.more}>Read more</span>
        </p>
      )}

      <div className={styles.buttonsContainer}>
        <Button
          text="Play Now"
          icon={playIcon}
          style={{
            backgroundColor: "#00925D",
            display: `${width < 500 ? "none" : "flex"}`,
          }}
        />
        {!isExplore && (
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
    </div>
  );
}
