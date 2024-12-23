import React from "react";

interface LoginCardProps {
    children: React.ReactNode;
}

const LoginCard: React.FC<LoginCardProps> = ({children}) =>{

    return <div>{children}</div>;
}

export default LoginCard;