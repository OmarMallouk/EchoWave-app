import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import lyricNote from "/assests/genrelyric.jpg?url";
import originalCh from "/assests/originalCheck.jpg?url";
import writing from "/assests/writing.jpg?url";
import styles from "./Home.module.css";
import { Button, Container, Overlay, Text, Title, Grid, SimpleGrid, Skeleton } from '@mantine/core';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PRIMARY_COL_HEIGHT = '300px';

const Home = () => {
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;


    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);
  
      gsap.to(`.${styles.featuresTitle}`, {
        scrollTrigger: {
          trigger: `.${styles.featuresTitle}`,
          start: "top 80%", 
          toggleActions: "play none none reverse",
          markers: false, 
        },
        opacity: 1,
        y: 0,
        duration: 1,
      });
      
  
      gsap.to(`.${styles.fadeInSection}`, {
        scrollTrigger: {
          trigger: `.${styles.fadeInSection}`,
          start: "top 80%",
          toggleActions: "play none none reverse",
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 1,
      });

          gsap.to(`.${styles.fadeInSectionReverse}`, {
            scrollTrigger: {
              trigger: `.${styles.fadeInSectionReverse}`,
              start: "top 80%",
              toggleActions: "play none none reverse",
              once: true,
            },
            opacity: 1,
            y: 0,
            duration: 1,
          });

       gsap.to(`.${styles.fadeInSection2}`, {
        scrollTrigger: {
          trigger: `.${styles.fadeInSection2}`,
          start: "top 80%",
          toggleActions: "play none none reverse",
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 1,
      });
    }, []);
  


    return ( 
        <div>
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

      <div className={styles.featuresContainer}>
        <h2 className={styles.featuresTitle}>Features</h2>
        <div className={styles.fadeInSection}>
        <div className={styles.imageWrapper}>
          <img
            src={writing}
            alt="Example"
            className={styles.fadeInImage}
          />
        </div>
        <div className={styles.fadeInText}>
          <h2>“Craft <span className={styles.highlightLyrics}>Lyrics</span> That Matches Your <span className={styles.highlightLyrics}>Mood</span></h2>
          <p>– Let your emotions guide the words as our AI tailors lyrics to fit the genre you choose.”</p>
          <Button  color="rgba(124, 39, 143, 1)" size="sm" radius="xl" className={styles.control}>
                Start now
              </Button>
        </div>
            </div>


            <div className={styles.fadeInSectionReverse}>
    <div className={styles.fadeInText}>
      <h2>“Tailored <span className={styles.highlightLyrics}>Lyrics</span> for Every <span className={styles.highlightLyrics}>Genre</span></h2>
      <p>– Whether it’s hip-hop, rock, country, our AI crafts lyrics that flow smoothly with your chosen style.”</p>
      <Button  color="rgba(124, 39, 143, 1)" size="sm" radius="xl" className={styles.control}>
                Get started
              </Button>
    </div>
    <div className={styles.imageWrapper}>
    <img
      src={lyricNote}
      alt="Example"
      className={styles.fadeInImage}
    />
  </div>
 </div>
      


      <div className={styles.fadeInSection2}>
      <div className={styles.imageWrapper}>
        <img
          src={originalCh}
          alt="Example"
          className={styles.fadeInImage}
        />
        </div>
        <div className={styles.fadeInText}>
          <h2>“Stay Unique with <span className={styles.highlightLyrics}>AI</span> Originality Check</h2>
          <p>–Get instant feedback on your lyrics’ uniqueness and spot similarities with existing songs effortlessly.”</p>
          <Button  color="rgba(124, 39, 143, 1)" size="sm" radius="xl" className={styles.control}>
                check now
              </Button>
        </div>
            </div>
            </div>

       

      </div>
    );
}

export default Home;
