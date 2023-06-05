import styles from "./Streamlist.module.css";
export default function StreamList({ item }) {
  return <img src={item.image} alt="" className={styles.image} />;
}
