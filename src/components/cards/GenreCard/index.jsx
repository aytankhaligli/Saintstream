import { Link } from "react-router-dom";
import styles from "./GenreCard.module.css";

export default function GenreCard({ item }) {
  console.log(item.id);
  return (
    <Link to={`genres/${item.id}`}>
      <div className={styles.card}>{item.name}</div>
    </Link>
  );
}
