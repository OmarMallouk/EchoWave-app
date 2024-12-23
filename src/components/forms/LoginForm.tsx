import { useState } from "react";
import logo from "../../assets/logoPure (1).png";



interface LoginFormProps{
    onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onLogin}) =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
 

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

        onLogin(username, password);
       
    };


    return(
        <form onSubmit={handleSubmit} >
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