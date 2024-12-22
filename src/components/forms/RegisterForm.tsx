import { useState } from "react";

interface RegisterProps{
    onRegister: (username: string, email:string, password: string) => void;
}

const RegisterForm: React.FC<RegisterProps> = ({onRegister}) =>{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


 
    );

}