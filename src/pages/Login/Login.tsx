import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "../../components/forms/LoginForm";
import { useNavigate } from "react-router-dom";
import { loginn } from "../../apis/authApi";
import styles from "./Login.module.css";


const Login: React.FC = () =>{
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

        

    const handleLogin = async (username: string, password: string) =>{
       
        try {
            const response = await loginn(username,password);
            const token = response.token;
            
            if (!token) {
                throw new Error("Token not found in the response.");
              }
            login(token);

            console.log("Login successful", response);
            navigate("/home");
            
            
        } catch (error) {
            console.error("Error login", error);
            
        }
    };

    const handleRegisterChange = () =>{
        navigate("/register");
    }

    return (

        <div className={styles.body1}>
            <div className={styles.loginPage}>
                <div className={styles.loginContainer}>
                <LoginForm className={styles.loginForm} onLogin={handleLogin} />
                <h3 className={styles.logintitle}>Dont have an account?{' '}
              <a href="#" className={styles.loginBtn} onClick={handleRegisterChange}>
                Register now
              </a></h3>
            
                </div>
            </div>
        </div>
    );

}

export default Login;