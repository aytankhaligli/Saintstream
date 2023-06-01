import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.textContainer}>
        <p className={styles.text}>Privacy policy</p>
        <p className={styles.text}>Term of service</p>
        <p className={styles.text}>Language</p>
      </div>
      <div>
        <p className={styles.copyText}>&copy; 2023</p>
      </div>
    </footer>
  );
}
