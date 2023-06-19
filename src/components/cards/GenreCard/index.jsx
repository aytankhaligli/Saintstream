import styles from "./GenreCard.module.css";

export default function GenreCard({ item }) {
  return <div className={styles.card}>{item.name}</div>;
}
