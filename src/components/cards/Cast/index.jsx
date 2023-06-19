import { useContext } from "react";
import styles from "./Cast.module.css";
import { MovieContext } from "../../../context/MovieContext";
export default function Cast({ item }) {
  const { getPosterImg } = useContext(MovieContext);
  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <img
          src={getPosterImg(item.profile_path)}
          alt=""
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{item.name}</p>
        <p className={styles.role}>{item.character}</p>
      </div>
    </div>
  );
}
