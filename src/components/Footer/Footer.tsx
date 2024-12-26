import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
    return ( 
        <footer className={styles.footer}>
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
        </div>
        <ul className={styles.buttonList}>
       
  
        </ul>
      </footer>
     );
}
 
export default Footer;