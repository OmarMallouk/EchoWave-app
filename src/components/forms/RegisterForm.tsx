import { useState } from "react";
import logo from "/assests/logo.png?url";

interface RegisterProps{
    onRegister: (username: string, email:string, password: string) => void;
}

const RegisterForm: React.FC<RegisterProps> = ({onRegister}) =>{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();


        onRegister(username,email,password);
    };

    return(

        <form onSubmit={handleSubmit}>
          
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
                type="email"
                id="email"
                placeholder="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
                ></input>
            </div>
            <div>
                <input
                type="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                ></input>
            </div>
            <button type="submit" onClick={handleSubmit}>Signup</button>
        </form>

    );

}

export default RegisterForm;