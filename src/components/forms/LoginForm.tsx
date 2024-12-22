import { useState } from "react";


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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input 
                type="text"
                id="email"
                value={username}
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
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;