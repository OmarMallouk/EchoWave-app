import { useState } from "react";
import logo from "/assests/logo.png?url";

interface RegisterProps{
    className?: string;
    onRegister: (username: string, email:string, password: string, role: string, channelName:string) => void;
}

const RegisterForm: React.FC<RegisterProps> = ({className,onRegister}) =>{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [channelName, setChannelName] = useState("");


    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

    if (role === "song_producer" && !channelName) {
            alert("Channel name is required for song producers.");
            return;
        }

        onRegister(username,email,password, role, channelName);
    };

    return(

        <form className={className} onSubmit={handleSubmit}>
          
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
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="song_producer">Song Producer</option>
            </select>
           
            <button type="submit" onClick={handleSubmit}>Signup</button>
        </form>

    );

}

export default RegisterForm;