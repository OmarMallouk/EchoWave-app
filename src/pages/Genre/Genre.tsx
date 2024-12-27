import React from "react";
import { useState, useEffect } from "react";
import styles from "./Genre.module.css"
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const Genre = () => {

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


    <div className={styles.body3}>


<div className={styles.Title1}> <h1>Choose a Genre and feel the harmony</h1></div>


<div className={styles.imageGrid}>
        {['Hip-hop', 'Funk', 'Jazz', 'Affrobeat', 'Heavy-Metal', 'Country'].map((mood) => (
          <div key={mood} className={styles.image} onClick={() => handleMoodSelection(mood)}>
          
          </div>
        ))}
      </div>
      





        </div>
     );
}
 
export default Genre;