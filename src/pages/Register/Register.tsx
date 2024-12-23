import React from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import { register } from "../../apis/authApi";
import { useNavigate } from "react-router-dom";


const Register: React.FC = () =>{
    const navigate = useNavigate();

    const handleRegister = async (username: string, email: string, password: string) =>{

        try {
            
            const response = await register(username,email,password);
            console.log("Registerd successfully", response);
            navigate("/login");
            
        } catch (error) {
            console.error("Registration failed..", error);
            
        }
    };
    
    const handleLogiChange = () =>{
        navigate("/login");
    }


    return(

        <div>
            <h1>Register</h1>
            <RegisterForm onRegister={handleRegister}/>
            <button onClick={handleLogiChange}>already a user? login now</button>
        </div>

    );

    
}

export default Register;