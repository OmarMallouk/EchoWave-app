import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("Token");
        navigate("/")
    }
    return ( 
        <div>
            Welcome Home!

            <button onClick={handleLogout}>logout</button>
        </div>
     );
}
 
export default Home;
