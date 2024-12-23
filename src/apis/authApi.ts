import axios from "axios";


export const register = async (username: string, email:string, password: string) =>{

    try {
        const respone = await axios.post("http://127.0.0.1:8080/users/create", {username,email,password});
        
    } catch (error) {
        
    }
}