import axios from "axios";


export const register = async (username: string, email:string, password: string) =>{

    try {
        const response = await axios.post("http://127.0.0.1:8080/users/create", {username,email,password},
            {headers:{
                "Content-Type": "application/json",
            },}
        );
        console.log("Registered successfully", response);
        return response.data;
        
    } catch (error) {
        
    }
}