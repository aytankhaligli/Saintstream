import Hero from "../../components/Hero";
import SimpleSlider from "../../components/Slider";
import MultipleItems from "../../components/Slider/MultiItems";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <SimpleSlider />
      <MultipleItems />
    </div>
  );
}
