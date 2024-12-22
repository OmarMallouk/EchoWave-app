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
       
        </form>

    );

}