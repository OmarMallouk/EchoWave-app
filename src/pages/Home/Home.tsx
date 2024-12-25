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
        
          </div>
        </Container>
      </div>


      </div>
    );
}

export default Home;
