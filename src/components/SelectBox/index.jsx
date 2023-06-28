import styles from "./SelectBox.module.css";

export default function SelectBox({ data, name, onChange }) {
  return (
    <div>
      <select className={styles.select} onChange={onChange}>
        <option>{name}</option>
        {data.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </div>
  );
}
