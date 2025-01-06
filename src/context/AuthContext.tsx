import React, { useContext, useEffect } from "react";
import { createContext, useState, ReactNode } from "react";

interface AuthTypes {
    isAuthenticated: boolean;
    user: any;
    login: (token: string, user: any) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthTypes>({
    isAuthenticated: false,
    user: null,
    login: () => {}, 
    logout: () => {}, 
  });
  
export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem("Token");
      });

      const [user, setUser] = useState<any>(() => {
        const userData = localStorage.getItem("User");
        return userData ? JSON.parse(userData) : null;
      });

      useEffect(() => {
        const token = localStorage.getItem("Token");

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, []);
      
    const login =(token: string, user: any) =>{
      localStorage.setItem("Token",token);
      setIsAuthenticated(true);
      setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("Token");
    setIsAuthenticated(false);
    setUser(null);
};

    return(

        <AuthContext.Provider value={{isAuthenticated,login,logout, user}}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);