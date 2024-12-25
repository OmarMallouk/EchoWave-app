import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css"
import { Button, Container, Overlay, Text, Title } from '@mantine/core';



const Home = () => {
    

  
    return ( 
        <div className={styles.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
   
      </div>
     );
}
 
export default Home;
