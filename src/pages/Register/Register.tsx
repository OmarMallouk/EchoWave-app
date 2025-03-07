import React from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import { register } from "../../apis/authApi";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";


const Register: React.FC = () =>{
    const navigate = useNavigate();

    const handleRegister = async (username: string, email: string, password: string, role: string, channelName?:string) =>{

        try {
            
            const response = await register(username,email,password, role, channelName);
            console.log("Registerd successfully", response);
            navigate("/login");
            
        } catch (error) {
            console.error("Registration failed..", error);
            
        }
    };
    
    const handleLoginChange = () =>{
        navigate("/login");
    }


    return(
        <div className={styles.body1}>
            <div className={styles.registerPage}>
             <div className={styles.registerContainer}>
            <RegisterForm  className={styles.registerForm} onRegister={handleRegister}/>
            <h3 className={styles.registerBtn} >already a user?  
            <a href="#" className={styles.registerBtns} onClick={handleLoginChange}> Login </a>
            </h3>
            </div>
        </div>
        </div>

    );

    
}

export default Register;