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