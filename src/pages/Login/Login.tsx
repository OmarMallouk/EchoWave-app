import React from "react";
import LoginForm from "../../components/forms/LoginForm";
import axios from "axios";

const Login: React.FC = () =>{

    const handleLogin = async (username: string, password: string) =>{
        

        try {
            const response = await axios.post("http://127.0.0.1:8080/auth/login", {username,password});
            console.log("Login successful", response);
            return response.data;
            
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