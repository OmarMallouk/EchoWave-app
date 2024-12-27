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
     
            }
          );
        });
      }, []);
      
  

  return (
   <div className={styles.body2}> 

   
      </div>          
      
      
                   
  );
};

export default Mood;
