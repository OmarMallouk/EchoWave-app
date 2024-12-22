import { useState } from "react";

interface LoginFormProps{
    onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onLogin}) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

        onLogin(email, password);
    };


    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                type="email"
                id="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
                ></input>
            </div>
        </form>
    )
}