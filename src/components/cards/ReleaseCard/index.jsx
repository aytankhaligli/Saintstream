import { Link } from "react-router-dom";
import Categories from "../../Categories";
import Rate from "../../Rate";
import styles from "./ReleaseCard.module.css";
export default function ReleaseCard({ item }) {
  return (
    <Link to={`/${item.id}`}>
      <div className={styles.card}>
        <img src={item.image} alt="" className={styles.image} />
        <div className={styles.info}>
          <h1 className={styles.title}>{item.name}</h1>
          <div className={styles.ratingBox}>
            <Rate rating={item.imdb} />
            <Categories categories={item.categories} />
          </div>
        </div>
      </div>
    </Link>
  );
}
