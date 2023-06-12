import styles from "./Cast.module.css";
export default function Cast({ item }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <img src={item.image} alt="" className={styles.image} />
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{item.name}</p>
        <p className={styles.role}>{item.role}</p>
      </div>
    </div>
  );
}
