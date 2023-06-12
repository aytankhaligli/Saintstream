import styles from "./Input.module.css";

export default function Input({ placeholder, onChange }) {
  return (
    <div className={styles.inputBox}>
      <label>{placeholder}</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
}
