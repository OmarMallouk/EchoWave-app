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
            
      }, []);
      
     
    return ( 


    <div className={styles.body3}>



        </div>
     );
}
 
export default Genre;