import styles from "./Input.module.css";

export default function Input({ placeholder, onChange, type }) {
  return (
    <div className={styles.inputBox}>
      <label>{placeholder}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
}
