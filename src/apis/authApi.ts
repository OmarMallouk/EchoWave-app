import axios from "axios";


export const register = async (username: string, email:string, password: string, role:string, channelName?: string) =>{

    try {
        const response = await axios.post("http://35.181.154.194:8000/users/create", {username,email,password, role, channelName},
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


export const loginn = async (username: string, password: string) =>{

    try {
        const response = await axios.post("http://35.181.154.194:8000/auth/login", {username,password},{
            headers:{
                "Content-Type": "application/json",
            },});
            console.log("Logged in successfully", response);
            return response.data;


        } catch (error: unknown) {
            if(axios.isAxiosError(error)){
                throw new Error(error.response?.data?.message || "Logg in failed.");
            }
            throw new Error("An error has occured ;(");
            
            
        }
    }
    
