import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface PrivateProps{
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateProps> = ({children}) =>{
    const {isAuthenticated} = useContext(AuthContext);

    return isAuthenticated ? <> {children}</> : <Navigate to="/" />;
};

export default PrivateRoute;