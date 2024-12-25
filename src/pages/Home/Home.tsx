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
        <Container className={styles.container} size="xl">
          <Title className={styles.title}>Unique Exclusive <span className={styles.highlightLyrics}>Lyrics</span>, <br />
          <span className={styles.subtitle}>Just for <span className={styles.highlightYou}>You</span></span></Title>
          <Title className={styles.description} size="sm" mt="xl">
          Transform your ideas into original <span className={styles.highlightMagic}>lyrics</span> with the power of AI. Whether you’re a budding <span className={styles.highlightMagic}>songwriter</span> or a seasoned <span className={styles.highlightMagic}>musician</span>, our platform helps you craft songs that reflect your unique <span className={styles.highlightMagic}>voice</span>, <span className={styles.highlightMagic}>style</span> and <span className={styles.highlightMagic}>mood</span>, instantly. 
          </Title>
          <div className={styles.heroWrap} >
              <Title className={styles.intro1} size="sm" mt="xl">
               Not a member yet ?
              </Title>
              <Button  color="rgba(124, 39, 143, 1)" size="sm" radius="xl" className={styles.control}>
                Get started
              </Button>
          </div>
        </Container>
      </div>
     );
}
 
export default Home;
