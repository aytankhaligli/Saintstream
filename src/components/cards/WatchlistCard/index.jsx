import { Link } from "react-router-dom";
import Categories from "../../Categories";
import Rate from "../../Rate";
import styles from "./Watchlist.module.css";
import { useContext } from "react";
import { MovieContext } from "../../../context/MovieContext";

export default function Watchlist({ item }) {
  const { getPosterImg } = useContext(MovieContext);
  return (
    <Link to={`/${item.id}`}>
      <div className={styles.card}>
        <div className={styles.image}>
          <img src={getPosterImg(item.poster_path)} alt="" />
        </div>
        <h1 className={styles.title}>{item.title}</h1>
        <div className={styles.ratingBox}>
          <Rate rating={item.vote_average} />
          {/* <Categories categories={item.categories} /> */}
        </div>
      </div>
    </Link>
  );
}
