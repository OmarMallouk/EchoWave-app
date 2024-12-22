import React, { useEffect } from "react";
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
        if(token){
            setIsAuthenticated(true);
        }
    },[])

    const login =(token: string) =>{

        setIsAuthenticated(true);
        localStorage.setItem("Token",token);
    };

    const logout = () =>{
        setIsAuthenticated(false);
        localStorage.removeItem("Token");
    };

    return(

        <AuthContext.Provider value={{isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    );

}