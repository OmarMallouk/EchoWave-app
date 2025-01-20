import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate,Link  } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "/assests/logo.png?url";
import styles from "./Navbar.module.css";

const Navbar = ({}) => {
    const {isAuthenticated, logout, userRole} = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("");



    const handleItemClick = (item:any) => {
        setActiveItem(item); 
    };

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
        console.log(isMenuOpen);
      };

 
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
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
        if (!isAuthenticated && window.location.pathname !== "/login"  && window.location.pathname !== "/register"  && window.location.pathname !== "/home" && window.location.pathname !== "/") {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);


    return ( 
        <div className={styles.navPage}>
        <div className={styles.navContainer}>
        <div className={styles.navLogo}>
    <Link to="/">
        <img className={styles.imgLogo} src={logo} alt="Logo" />
    </Link>
    <div className={styles.navText}>Echo Wave</div>
</div>
            <button className={styles.navToggle} onClick={toggleMenu}>
                ☰
            </button>
            <div className={styles.ulContainer}>
            <ul className={`${styles.navMenu} ${isMenuOpen ? styles.menuOpen : ""}`}>
                   

                    {isAuthenticated && userRole === "song_producer" && (
                        <>

<li
                        className={
                            activeItem === "home" ? styles.activeItem : ""
                        }
                        onClick={() => handleItemClick("home")}
                    >
                        <Link to="/">Home</Link>
                    </li>
                            <li
                                className={
                                    activeItem === "mood" ? styles.activeItem : ""
                                }
                                onClick={() => handleItemClick("mood")}
                            >
                                <Link to="/mood">Mood</Link>
                            </li>
                            <li
                                className={
                                    activeItem === "genre" ? styles.activeItem : ""
                                }
                                onClick={() => handleItemClick("genre")}
                            >
                                <Link to="/genre">Genre</Link>
                            </li>
                            <li
                                className={
                                    activeItem === "origin" ? styles.activeItem : ""
                                }
                                onClick={() => handleItemClick("origin")}
                            >
                                <Link to="/origin">Originality</Link>
                            </li>
                            <li
                                className={
                                    activeItem === "channels" ? styles.activeItem : ""
                                }
                                onClick={() => handleItemClick("channels")}
                            >
                                <Link to="/channels">Channels</Link>
                            </li>
                            <li
                                className={
                                    activeItem === "channel" ? styles.activeItem : ""
                                }
                                onClick={() => handleItemClick("channel")}
                            >
                                <Link to="/channel">MyChannel</Link>
                            </li>
                        </>
                    )}

                    {isAuthenticated && userRole === "user" && (
                        <>
                            <li
                                className={
                                    activeItem === "mood" ? styles.activeItem : ""
                                }
                                onClick={() => handleItemClick("mood")}
                            >
                                <Link to="/mood">Mood</Link>
                            </li>
                            <li
                                className={
                                    activeItem === "genre" ? styles.activeItem : ""
                                }
                                onClick={() => handleItemClick("genre")}
                            >
                                <Link to="/genre">Genre</Link>
                            </li>
                            <li
                                className={
                                    activeItem === "origin" ? styles.activeItem : ""
                                }
                                onClick={() => handleItemClick("origin")}
                            >
                                <Link to="/origin">Originality</Link>
                            </li>
                            <li
                                className={
                                    activeItem === "channels" ? styles.activeItem : ""
                                }
                                onClick={() => handleItemClick("channels")}
                            >
                                <Link to="/channels">Channels</Link>
                            </li>
                            <li
                                className={
                                    activeItem === "profile" ? styles.activeItem : ""
                                }
                                onClick={() => handleItemClick("profile")}
                            >
                                <Link to="/userProfile">Profile</Link>
                            </li>
                        </>
                    )}

{isAuthenticated && userRole === "admin" && (
                        <>
                            <li
                                className={
                                    activeItem === "dashboard" ? styles.activeItem : ""
                                }
                                onClick={() => handleItemClick("admin")}
                            >
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                   
                        </>
                    )}
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