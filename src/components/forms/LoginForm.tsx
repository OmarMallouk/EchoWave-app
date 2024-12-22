import { useState } from "react";

interface LoginFormProps{
    onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onLogin}) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
}