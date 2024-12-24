import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css"


const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("Token");
        navigate("/")
    }
    return ( 
        <div className={styles.body2}>
            Welcome Home!

            <button onClick={handleLogout}>logout</button>
        </div>
     );
}
 
export default Home;
