import styles from "./Button.module.css";

export default function Button({ icon, text, style, show = true }) {
  return (
    <div className={!show ? [styles.button, styles.hidden].join(" ") : styles.button} style={style}>
      <img src={icon} alt="" className={styles.icon} />
      {text}
    </div>
  );
}
