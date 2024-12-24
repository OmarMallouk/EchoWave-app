import React, { useContext, useEffect } from "react";
import { createContext, useState, ReactNode } from "react";

interface AuthTypes {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthTypes>({
    isAuthenticated: false,
    login: () => {}, 
    logout: () => {}, 
  });
  
export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
        const token = localStorage.getItem("Token");
            setIsAuthenticated(!!token);
    },[])

    const login =(token: string) =>{

        localStorage.setItem("Token",token);
        setIsAuthenticated(true);
    };

    const logout = () =>{
        localStorage.removeItem("Token");
        setIsAuthenticated(false);
    };

    return(

        <AuthContext.Provider value={{isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);