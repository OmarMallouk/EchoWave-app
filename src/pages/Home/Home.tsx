import { useEffect,useRef, useState } from "react";
import lyricNote from "/assests/genrelyric.jpg?url";
import originalCh from "/assests/originalCheck.jpg?url";
import writing from "/assests/writing.jpg?url";
import channel1 from "/assests/records5.jpeg?url";
import styles from "./Home.module.css";
import { Button, Container, Overlay,Title } from '@mantine/core';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const cardsData = [
  {
      title: "Jay in the Cray",
      description: "Jay is, and always have been the right way :!",
      imgSrc: channel1,
      link: "https://twitter.com/mannupaaji",
  },
];

const Home = () => {

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
      <h2>“Tailored <span className={styles.highlightLyrics}>Lyrics</span> for Every <span className={styles.highlightGenre}>Genre</span></h2>
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
          <h2>“Stay Unique with <span className={styles.highlightLyrics}>AI</span> Originality <span className={styles.highlightLyrics}>Check</span></h2>
          <p>–Get instant feedback on your lyrics’ uniqueness and spot similarities with existing songs effortlessly.”</p>
          <Button  color="rgba(124, 39, 143, 1)" size="sm" radius="xl" className={styles.control}>
                check now
              </Button>
        </div>
            </div>
            </div> 


            <div className={styles.chane}>Channels</div> 



<div className={styles.carouselsCo}>
  
              <div className={styles.container2}>
    <div className={styles.carousel}>
      <div className={styles.carousel__face}><span>This is something</span></div>
      <div className={styles.carousel__face}><span>Very special</span></div>
      <div className={styles.carousel__face}><span>Special is the key</span></div>
      <div className={styles.carousel__face}><span>For you</span></div>
      <div className={styles.carousel__face}><span>Just give it</span></div>
      <div className={styles.carousel__face}><span>A try</span></div>
      <div className={styles.carousel__face}><span>And see</span></div>
      <div className={styles.carousel__face}><span>How IT Works</span></div>
      <div className={styles.carousel__face}><span>Woow</span></div>
    </div>
  </div>

</div>

</div>

      
    );
}

export default Home;
