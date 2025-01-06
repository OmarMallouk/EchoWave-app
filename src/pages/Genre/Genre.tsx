import React from "react";
import { useState, useEffect } from "react";
import styles from "./Genre.module.css"
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
gsap.registerPlugin(ScrollTrigger);


const Genre = () => {

  const [selectedGenre, setSelectedGenre] = useState('');
   const [lyrics, setLyrics] = useState(null); 
    const [title, setTitle] = useState('');
    const [user, setUser] = useState('');
    const [error, setError] = useState("");

    useEffect(() => {
      const images = document.querySelectorAll(`.${styles.image}`);
    
      images.forEach((image) => {
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
      

  
  


    return ( 


    <div className={styles.body3}>


<div className={styles.Title1}> <h1>Choose a Genre and feel the harmony</h1></div>


<div className={styles.imageGrid}>
       
      </div>
      
   
<div className={styles.Title1}> <h1>Didn't find any? search more </h1></div>  


<div className="dropdown dropdown-hover dropdown-right dropdown-end">
  
</div>
   
   



        </div>
     );
}
 
export default Genre;