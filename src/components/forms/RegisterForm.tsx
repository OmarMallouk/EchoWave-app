import { useState } from "react";

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
                <label htmlFor="username">Username</label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                required
                ></input>
            </div>
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
            <div>
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
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