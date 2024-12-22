import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "../../components/forms/LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () =>{
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

        

    const handleLogin = async (username: string, password: string) =>{
       

        try {
            const response = await axios.post("http://127.0.0.1:8080/auth/login", {username,password},
                {headers:{
                    "Content-Type": "application/json",
                },}
            );
            console.log("Login successful", response);
            
            if (response.status === 200) {
                const token = response.data.token;
                login(token);
                navigate("/home");
            }
            
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