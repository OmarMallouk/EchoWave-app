import { useState } from "react";
import logo from "/assests/logo.png?url";



interface LoginFormProps{
    className?: string;
    onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({className,onLogin}) =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
 

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

        onLogin(username, password);
       
    };


    return(
        <form className={className} onSubmit={handleSubmit} >
            <div>
                <img src={logo} alt="logos" />
                <input 
                type="text"
                id="username"
                placeholder="username"
                value={username}
               
                onChange={(e)=> setUsername(e.target.value)}
                required
                ></input>
            </div>
            <div>
                <input
                type="password"
                id="password"
                value={password}
                placeholder="password"
                onChange={(e)=>setPassword(e.target.value)}
                required
                ></input>
            </div>
            <button type="submit" >Login</button>
        </form>
    );
};

export default LoginForm;