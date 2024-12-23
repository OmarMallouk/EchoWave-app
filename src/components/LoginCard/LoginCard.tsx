import React from "react";
import styles from "./LoginCard.module.css"

interface LoginCardProps {
    children: React.ReactNode;
}

const LoginCard: React.FC<LoginCardProps> = ({children}) =>{

    return <div className={styles.card}>{children}</div>;
}

export default LoginCard;