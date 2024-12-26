import React from "react";
import styles from "./Footer.module.css";
import logo from "/assests/logo.png?url";

const Footer = () => {
    return ( 
        <div>
            <footer className={styles.footer}>
            <div className={styles.logoContainers}>
              <div className={styles.navLogos}><img src={logo} alt="Logos" className={styles.logos} /></div>
            </div>
            <div className={styles.ulContainers}>
                <ul className={styles.navMenus} >
                  <li className={styles.buttonItems}>
                    <button className={styles.buttons}>Home</button>
                  </li>
                  <li className={styles.buttonItems}>
                    <button className={styles.buttons}>Mood</button>
                  </li>
                  <li className={styles.buttonItems}>
                    <button className={styles.buttons}>Genre</button>
                  </li>
                  <li className={styles.buttonItems}>
                    <button className={styles.buttons}>Originality</button>
                  </li>
                </ul>
            </div>
                  </footer>
        </div>
     );
}
 
export default Footer;