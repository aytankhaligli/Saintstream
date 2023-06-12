import styles from "./MovieCard.module.css";
import Rate from "../../Rate";
import Categories from "../../Categories";
import filmIcon from "../../../assets/icons/film.svg";
import { Link } from "react-router-dom";

export default function MovieCard({ item, index }) {
  return (
    <Link to={`/${item.id}`}>
      <div className={styles.card}>
        <div className={styles.number}>{index + 1}</div>
        <div className={styles.imageBox}>
          <img src={item.image} alt="" className={styles.image} />
        </div>
        <div className={styles.description}>
          <div className={styles.subtitle}>PG-13</div>
          <h1 className={styles.title}>{item.name}</h1>
          <Categories categories={item.categories} icon={filmIcon} />
          <Rate rating={item.imdb} />
        </div>
      </div>
    </Link>
  );
}
