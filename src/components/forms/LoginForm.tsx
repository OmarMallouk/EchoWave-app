import { useState } from "react";
import logo from "../../assets/logoPure (1).png";


interface LoginFormProps{
    onLogin: (username: string, password: string) => void;
    containerClassname?: string;
    inputClassname?: string;
    buttonClassname?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({onLogin, inputClassname, containerClassname, buttonClassname}) =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
 

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

        onLogin(username, password);
       
    };


    return(
        <form onSubmit={handleSubmit} className={containerClassname}>
            <div>
                <img src={logo} alt="logos" />
                <label htmlFor="username">Username</label>
                <input 
                type="text"
                id="email"
                value={username}
                className={inputClassname}
                onChange={(e)=> setUsername(e.target.value)}
                required
                ></input>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                ></input>
            </div>
            <button type="submit" className={buttonClassname}>Login</button>
        </form>
    );
};

export default LoginForm;