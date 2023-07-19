import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import styles from "./Video.module.css";
export default function Video() {
  const { video } = useContext(MovieContext);
  return (
    video && (
      <div className={styles.container}>
        <iframe
          src={`https://www.youtube.com/embed/${video[0].key}`}
          title={video[0].name}
          width="100%"
          height="100%"
          className={styles.videoContainer}
        ></iframe>
        <div className={styles.grid}>
          {video.slice(1).map((vid) => (
            <div key={vid.key}>
              <iframe
                src={`https://www.youtube.com/embed/${vid.key}`}
                title={vid.name}
                width="100%"
                height="100%"
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
