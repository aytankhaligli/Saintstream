import styles from "./Hero.module.css";
import image from "../../assets/Mandalorian.png";
import Button from "../Button";
import bookmarkIcon from "../../assets/bookmark.svg";
import playIcon from "../../assets/play.svg";
import outlinePlayIcon from "../../assets/play_outline.svg";
import SimpleSlider from "../Slider";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <img src={image} alt="" className={styles.image} />
      <div className={styles.season}>Season 3</div>
      <h1 className={styles.title}>The Mandalorian</h1>
      <p className={styles.subtitle}>2h40m • 2022 • Fantasy • Actions</p>
      <p className={styles.text}>
        The third season of the American television series The Mandalorian stars
        Pedro Pascal as the title character, a bounty hunter traveling to
        Mandalore to redeem his past transgressions with his adopted son Grogu
        and being aided on their journey by fellow Mandalorian Bo-Katan Kryze.
      </p>
      <div className={styles.buttonsContainer}>
        <Button
          text="Play Now"
          icon={playIcon}
          style={{ backgroundColor: "#00925D" }}
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
