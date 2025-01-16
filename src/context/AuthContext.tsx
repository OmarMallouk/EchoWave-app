import React, { useContext, useEffect } from "react";
import { createContext, useState, ReactNode } from "react";

interface AuthTypes {
    isAuthenticated: boolean;
    user: any;
    userRole: string,
    login: (token: string, user: any) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthTypes>({
    isAuthenticated: false,
    user: null,
    userRole: "",
    login: () => {}, 
    logout: () => {}, 
  });
  
export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem("Token");
      });

    const [userRole, setUserRole] = useState<string>("");

      const [user, setUser] = useState<any>(null);

      useEffect(() => {
        const token = localStorage.getItem("Token");
        const userData = localStorage.getItem("User");

        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
            setUserRole(JSON.parse(userData).role);
        } else {
            setIsAuthenticated(false);
            setUser(null);
            setUserRole("");

        }
    }, []);
      
    const login =(token: string, user: any) =>{
      localStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("Token",token);
      setIsAuthenticated(true);
      setUser(user);
      setUserRole(user.role);
  };

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    setIsAuthenticated(false);
    setUser(null);
    setUserRole("");
};

    return(

        <AuthContext.Provider value={{isAuthenticated,login,logout, user, userRole}}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);