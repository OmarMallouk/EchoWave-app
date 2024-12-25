import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateProps{
    children: React.ReactNode;
    publicOnly?: boolean;
}

const ProtectedRoute: React.FC<PrivateProps> = ({children, publicOnly = false}) =>{
    const {isAuthenticated} = useAuth();
    const location = useLocation();

    if (publicOnly && isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

  
};

export default ProtectedRoute;