import React from "react";
import { createContext, useState, ReactNode } from "react";

interface AuthTypes {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logouts: () => void;
}

export const AuthContext = createContext<AuthTypes | null>(null);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) =>{
    
}