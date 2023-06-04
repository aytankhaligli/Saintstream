import Navbar from "../Navbar";
import styles from "./Footer.module.css";

import facebookIcon from "../../assets/icons/Facebook.svg";
import instagramIcon from "../../assets/icons/Instagram.svg";
import twitterIcon from "../../assets/icons/twitter.svg";
import googleIcon from "../../assets/icons/google.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.firstBox}>
        <div className={styles.title_box}>
          <p className={styles.title}>
            Our platform is trusted by millions & features best updated movies
            all around the world.
          </p>
        </div>
        <div className={styles.rightBox}>
          <div>
            <Navbar
              items={["Home", "Discover", "Forum", "About"]}
              element="/"
            />
          </div>
          <div className={styles.icons}>
            <img src={facebookIcon} alt="" className={styles.icon} />
            <img src={instagramIcon} alt="" className={styles.icon} />
            <img src={twitterIcon} alt="" className={styles.icon} />
            <img src={googleIcon} alt="" className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.secondBox}>
        <div className={styles.textContainer}>
          <p className={styles.text}>Privacy policy</p>
          <p className={styles.text}>Term of service</p>
          <p className={styles.text}>Language</p>
        </div>
        <div>
          <p className={styles.copyText}>&copy; 2023</p>
        </div>
      </div>
    </footer>
  );
}
