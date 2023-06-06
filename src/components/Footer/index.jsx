import Navbar from "../Navbar";
import styles from "./Footer.module.css";

import facebookIcon from "../../assets/icons/Facebook.svg";
import instagramIcon from "../../assets/icons/Instagram.svg";
import twitterIcon from "../../assets/icons/twitter.svg";
import googleIcon from "../../assets/icons/google.svg";
import {
  footerNavElements,
  footerElements,
  socialIcons,
} from "../../data/constants";

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
            <Navbar items={footerNavElements} element=" /" />
          </div>
          <div className={styles.icons}>
            {socialIcons.map((icon) => (
              <img
                key={icon.name}
                src={icon.url}
                alt={icon.name}
                className={styles.icon}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.secondBox}>
        <div className={styles.textContainer}>
          {footerElements.map((el, index) => (
            <p key={index} className={styles.text}>
              {el}
            </p>
          ))}
        </div>
        <div>
          <p className={styles.copyText}>&copy; 2023</p>
        </div>
      </div>
    </footer>
  );
}
