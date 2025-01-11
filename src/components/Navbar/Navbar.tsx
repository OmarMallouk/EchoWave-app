import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate,Link  } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "/assests/logo.png?url";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const {isAuthenticated, logout} = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
        console.log(isMenuOpen);
      };

 
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            // If Im scrolling down, hide the navbar
            if (prevScrollPos < currentScrollPos) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    const handleBtns = () =>{
        if (isAuthenticated){
            logout();
            navigate("/login");
        }
            navigate("/login");
        
    };

    useEffect(() => {
        if (!isAuthenticated && window.location.pathname !== "/login" && window.location.pathname !== "/origin"  && window.location.pathname !== "/userProfile" && window.location.pathname !== "/channel" && window.location.pathname !== "/channels" && window.location.pathname !== "/register" && window.location.pathname !== "/mood" && window.location.pathname !== "/genre" && window.location.pathname !== "/home" && window.location.pathname !== "/") {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);


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
                        <li>
                             <Link to="/">Home</Link>
                             </li>
                        <li><Link to="/mood">Mood</Link></li>
                        <li><Link to="/genre">Genre</Link></li>
                        <li><Link to="/origin">Originality</Link></li>
                        <li><Link to="/channels">Channels</Link></li>
                        <li><Link to="/userProfile">Profile</Link></li>
                        <li><Link to="/channel">Channel</Link></li>
                    </ul>
                </div>
                <button className={styles.authButton} onClick={handleBtns}>
                    {isAuthenticated ? "Logout" : "Login"}
                </button>
            </div>
        </div>
    );
    
};
 
export default Navbar;