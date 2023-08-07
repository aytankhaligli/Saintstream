import styles from "./Button.module.css";

export default function Button({
  icon,
  text,
  style,
  show = true,
  onClick,
  isMoviePageIcon,
}) {
  return (
    <div
      className={
        !show ? [styles.button, styles.hidden].join(" ") : styles.button
      }
      style={style}
      onClick={onClick}
    >
      {icon && <img src={icon} alt="" className={styles.icon} />}

      <p className={isMoviePageIcon && styles.text}> {text}</p>
    </div>
  );
}
