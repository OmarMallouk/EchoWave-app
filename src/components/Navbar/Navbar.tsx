import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/assests/logo.png?url";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>{
        const token = localStorage.getItem("token");

        if (token){
            setIsLoggedIn(true);
        }
    }, []);

    const handleBtns = () =>{
        if (isLoggedIn){
            localStorage.removeItem("token");
            setIsLoggedIn(false);
        }else{
            navigate("/login");
        }
    };


    return ( 
        <div className="navPage">
            <div className="navContainer">
                <img src={logo} alt="logos" />
                <ul>
                    <li>Home</li>
                    <li>Mood</li>
                    <li>Genre</li>
                    <li>Originality</li>
                    <li>Channels</li>
                </ul>
                
                <button onClick={handleBtns}>{isLoggedIn ? "Logout" : "Login/Register"}</button>
                
            </div>
        </div>
     );
}
 
export default Navbar;