import styles from "./Hero.module.css";
import Button from "../Button";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import playIcon from "../../assets/icons/play.svg";
import outlinePlayIcon from "../../assets/icons/play_outline.svg";

export default function Hero({
  description,
  season,
  image,
  title,
  releaseDate,
  category,
  time,
}) {
  const width = window.innerWidth;
  console.log(width);
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.image}>
        <img src={image} alt="" />
      </div>
      <div className={styles.season}>
        {season ? `Season ${season}` : "Movie"}
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>
        {time} • {releaseDate} {category.map((cat) => ` • ${cat}`)}
      </p>
      <p className={styles.text}>
        {width > 500 ? description : description.slice(0, 120) + "..."}
        <span className={styles.more}>Read more</span>
      </p>
      <div className={styles.buttonsContainer}>
        <Button
          text="Play Now"
          icon={playIcon}
          style={{
            backgroundColor: "#00925D",
            display: `${width < 500 ? "none" : "flex"}`,
          }}
        />
        <Button
          text="Watch Trailer"
          icon={outlinePlayIcon}
          style={{ backgroundColor: "#28262D" }}
        />
        <Button
          text="Add Watchlist"
          icon={bookmarkIcon}
          style={{ border: "1px solid #FFFFFF" }}
        />
      </div>
    </div>
  );
}
