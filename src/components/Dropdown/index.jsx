import styles from "./Dropdown.module.css";

export default function Dropdown() {
  return (
    <div className={styles.dropdown}>
      <ul className={styles.menu}>
        <li>Profile</li>
        <li>Home</li>
        <li>Settings</li>
        <li>Sign out</li>
      </ul>
    </div>
  );
}
