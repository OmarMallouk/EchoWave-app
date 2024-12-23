import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "../../components/forms/LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginn } from "../../apis/authApi";

const Login: React.FC = () =>{
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

        

    const handleLogin = async (username: string, password: string) =>{
       

        try {
            const response = await loginn(username,password);
            const token = response.data.token;
            login(token);

            console.log("Login successful", response);
            navigate("/home");
            
            
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