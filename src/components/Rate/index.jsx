import styles from "./Rate.module.css";
import ratingIcon from "../../assets/icons/rating.svg";

export default function Rate({ rating }) {
  return (
    <div className={styles.rating}>
      <img src={ratingIcon} alt="" />
      <p>
        {rating} <span className={styles.text}>| Movie</span>
      </p>
    </div>
  );
}
