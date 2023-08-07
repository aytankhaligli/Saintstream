import styles from "./Rate.module.css";
import ratingIcon from "../../assets/icons/Rating.svg";

export default function Rate({ rating, media_type }) {
  return (
    <div className={styles.rating}>
      <img src={ratingIcon} alt="" />
      <p>
        {rating.toFixed(1)}

        {media_type && <span className={styles.text}> | {media_type} </span>}
      </p>
    </div>
  );
}
