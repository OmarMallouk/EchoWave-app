import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "../../components/forms/LoginForm";
import { useNavigate } from "react-router-dom";
import { loginn } from "../../apis/authApi";
import LoginCard from "../../components/LoginCard/LoginCard";
import styles from "../../components/LoginCard/LoginCard.module.css"
import "./Login.module.css";


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

        <div>
            <h1>Login</h1>
            <LoginCard>
            <LoginForm onLogin={handleLogin} containerClassname={styles.formContainer}
          inputClassname={styles.input}
          buttonClassname={styles.button}/>
            <button onClick={handleRegisterChange}>Dont have an account? Register now</button>
            </LoginCard>
        </div>
    );

}

export default Login;