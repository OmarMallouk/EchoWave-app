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
        
    } catch (error: unknown) {
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || "Registration failed.");
        }
        throw new Error("An error has occured ;(");
        
        
    }
}