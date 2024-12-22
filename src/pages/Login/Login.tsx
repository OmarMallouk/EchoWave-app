import React from "react";
import LoginForm from "../../components/forms/LoginForm";
import axios from "axios";

const Login: React.FC = () =>{

    const handleLogin = async (email: string, password: string) =>{

        try {
            const response = await Login(email,password);
            console.log("Login successful", response);
            
        } catch (error) {
            console.error("Error login", error);
            
        }
    };

    return (

        <div>
            <h1>Login</h1>
            <LoginForm onLogin={handleLogin}/>
        </div>
    );

}

export default Login;