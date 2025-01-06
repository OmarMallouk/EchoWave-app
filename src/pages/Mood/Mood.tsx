import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from "./Mood.module.css";
import axios from 'axios';

import originalCh from "/assests/originalCheck.jpg?url";
import writing from "/assests/writing.jpg?url";
import channel1 from "/assests/records5.jpeg?url";

gsap.registerPlugin(ScrollTrigger);

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState('');
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

      useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("User") || "{}");
        if (userData._id) {
            setUser(userData._id);
        }
    }, []);

      const handleMoodSelection = async (mood:any) => {
        setSelectedMood(mood);
        await generateMoodLyrics(mood);
      };
      
      const generateMoodLyrics = async (mood:any) => {
        try {
          const prompt = `mood: ${mood}, lyrics:`;
          const response = await axios.post(
            'http://127.0.0.1:5000/generate-mood',
            { prompt },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          setLyrics(response.data.generated_text);
        } catch (error) {
          setLyrics(null);
          console.error("Error calling generate-mood API:", error);
        }
      };

      console.log({ title, lyrics, selectedMood, user });

      const addToCollection = async () =>{
        if (!title || !lyrics || !selectedMood || !user){
          setError("Missing fields");
        return;
        }
        try{
          const userData = JSON.parse(localStorage.getItem("User") || "{}");

          if (!userData._id){
            setError("User not found");
            return;
          }

          console.log("Adding lyric:", { title, lyrics, selectedMood, user: userData._id });

          const response = await axios.post("http://127.0.0.1:8080/lyrics/create", {
            title,
            content: lyrics,
            user: userData._id,
            mood: { name: selectedMood },
          },{
            headers:{
              "Content-Type": "application/json",
            },
          });

          if (response.status === 200){
            console.log("lyric added: ", response.data);
            
          }else{
            setError("Failed to add collection");
          }
        }catch(error){
          console.error("Error adding collection", error);
          setError("Something went wrong :(");
        }
      };


  return (
   <div className={styles.body2}> 

   <div className={styles.Title1}> <h1>Choose a mood and feel the <span>harmony</span></h1></div>


 
   <div className={styles.imageGrid}>
        {['Sad', 'Angry', 'Happy', 'Stressed', 'Ecstatic', 'Depressed', 'Envy', 'Loved'].map((mood) => (
          <div key={mood} className={styles.image} onClick={() => handleMoodSelection(mood)}>
            <img src={`https://picsum.photos/300/300?random=${mood}`} alt={mood} />
            <div className={styles.imageText}>{mood}</div>
          </div>
        ))}
      </div>
   
   
<div className={styles.Title1}> <h1>Didn't find any? search <span>more</span> </h1></div>  

<div className="dropdown dropdown-hover dropdown-right dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1">Moods</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    {['Joy', 'Fear', 'Sorrow', 'Anguish'].map((mood) => (
      <li key={mood}>
        <a onClick={() => handleMoodSelection(mood)}>{mood}</a>
      </li>
    ))}
  </ul>
</div>
   


{lyrics ? (
  <div className={`${styles.gridContainer} `}>
    <div className={`${styles.lyricsCard}`}>
      <h2>Generated Lyrics for <span>{selectedMood}</span></h2>
      <p>{lyrics}</p>
      
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter Title"
          className={styles.inputField}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className={styles.addButton}
          onClick={addToCollection}
        >
          Add to Collection
        </button>
      </div>
    </div>
  </div>
): (
  <div className={styles.placeholderText}>
    <p>Click on a mood to generate lyrics</p>
  </div>
)}

        
      </div>          
      
      
                   
  );
};

export default Mood;
