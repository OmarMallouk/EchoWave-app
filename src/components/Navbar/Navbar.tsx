import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/assests/logo.png?url";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

  


    return ( 
        <div className="navPage">
           
        </div>
     );
}
 
export default Navbar;