import styles from "./Categories.module.css";

export default function Categories({ categories, icon }) {
  return (
    <div className={styles.category}>
      {icon && <img src={icon} alt="" />} |
      {categories.map((cat) => (
        <p key={cat.name}>{cat.name}</p>
      ))}
    </div>
  );
}
