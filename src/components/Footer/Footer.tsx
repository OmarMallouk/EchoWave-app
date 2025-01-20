import React from "react";
import styles from "./Footer.module.css";
import logo from "/assests/logo.png?url";

const Footer = () => {
    return ( 
      <footer className="footer bg-zinc-900 text-white p-10">
      <aside>
      <img src={logo} alt="Logo" width="80" height="80" />
        <p>
          EchoWave & Co.
          <br />
          Providing reliable products since 2024
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>

      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
      </nav>
    </footer>
     );
}
 
export default Footer;