import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar({ items, element }) {
  return (
    <nav>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li className={styles.item} key={index}>
            <Link to="/">{item}</Link>
            {element && <span className={styles.element}>{element}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
