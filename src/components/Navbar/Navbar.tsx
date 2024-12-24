import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/assests/logo.png?url";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
        console.log(isMenuOpen);
      };

 

    const handleBtns = () =>{
        if (isLoggedIn){
           
            navigate("/login");
       
        }else{
            navigate("/login");
        }
    };


    return ( 
        <div className={styles.navPage}>
            <div className={styles.navContainer}>
                <div className={styles.navLogo} >
                    <img src={logo} alt="Logo" />
                    <div className={styles.navText}>Echo Wave</div>
                </div>
                <button className={styles.navToggle} onClick={toggleMenu}>
                    ☰
                </button>
                <div className={styles.ulContainer}>
                    <ul
                        className={`${styles.navMenu} ${
                            isMenuOpen ? styles.menuOpen : ""
                        }`}
                    >
                        <li>Home</li>
                        <li>Mood</li>
                        <li>Genre</li>
                        <li>Originality</li>
                        <li>Channels</li>
                    </ul>
                </div>
                <button className={styles.authButton} onClick={handleBtns}>
                    {isLoggedIn ? "Logout" : "Register/Login"}
                </button>
            </div>
        </div>
    );
    
};
 
export default Navbar;