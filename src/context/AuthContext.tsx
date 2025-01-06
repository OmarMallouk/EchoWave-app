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
        const userData = localStorage.getItem("User");

        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, []);
      
    const login =(token: string, user: any) =>{
      localStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("Token",token);
      setIsAuthenticated(true);
      setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
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