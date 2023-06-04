import styles from "./Button.module.css";

export default function Button({ icon, text, style }) {
  return (
    <div className={styles.button} style={style}>
      <img src={icon} alt="" className={styles.icon} />
      {text}
    </div>
  );
}
