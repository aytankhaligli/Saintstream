import MultipleItems from "../Slider/MultiItems";
import styles from "./Slidersection.module.css";

export default function SliderSection({ count, data, title, element, isCast }) {
  return (
    <div className={styles.container}>
      {title && <h1 className={styles.title}>{title}</h1>}
      <MultipleItems count={count} data={data} isCast={isCast}>
        {element}
      </MultipleItems>
    </div>
  );
}
