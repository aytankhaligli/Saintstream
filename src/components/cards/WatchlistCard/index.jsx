import Categories from "../../Categories";
import Rate from "../../Rate";
import styles from "./Watchlist.module.css";

export default function Watchlist({ item }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={item.image} alt="" />
      </div>
      <h1 className={styles.title}>{item.name}</h1>
      <div className={styles.ratingBox}>
        <Rate rating={item.imdb} />
        <Categories categories={item.categories} />
      </div>
    </div>
  );
}
