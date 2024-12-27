import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from "./Mood.module.css";

import originalCh from "/assests/originalCheck.jpg?url";
import writing from "/assests/writing.jpg?url";
import channel1 from "/assests/records5.jpeg?url";

gsap.registerPlugin(ScrollTrigger);

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [aiOutput, setAiOutput] = useState('');

    useEffect(() => {
        const images = document.querySelectorAll(`.${styles.image}`);
      
        images.forEach((image, index) => {
          gsap.fromTo(
            image,
            { 
              y: gsap.utils.random(100, 50),
              x: gsap.utils.random(-50, 50),
            },
            {
              y: 0, 
              x: 0,
              stagger: 0.5,
              scrollTrigger: {
                trigger: image,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1,
                markers: false,
              },
            }
          );
        });
      }, []);
      
      const handleMoodSelection = (mood: string) => {
        setSelectedMood(mood);
        // api didnt add yet
        const output = `Generated lyrics mood: ${mood}`;
        setAiOutput(output);
      
      }

  return (
   <div className={styles.body2}> 

   
      </div>          
      
      
                   
  );
};

export default Mood;
