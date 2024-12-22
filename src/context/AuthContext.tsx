import React from "react";
import { createContext, useState, ReactNode } from "react";

interface AuthTypes {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthTypes | null>(null);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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