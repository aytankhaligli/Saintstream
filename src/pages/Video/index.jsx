import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import styles from "./Video.module.css";
export default function Video() {
  const { video } = useContext(MovieContext);
  return (
    video && (
      <div className={styles.container}>
        <div className={styles.videoContainer}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${video[0].key}`}
            width="100%"
            height="100%"
            controls={true}
          />
        </div>
        <div className={styles.grid}>
          {video.slice(1).map((vid) => (
            <div key={vid.key}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${vid.key}`}
                width="100%"
                height="100%"
                controls={true}
              />
            </div>
          ))}
        </div>
      </div>
    )
  );
}
