import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar({ items, element }) {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li className={styles.item} key={index}>
            <NavLink
              to={item}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              {item}
            </NavLink>
            {element && <span className={styles.element}>{element}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
