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
      
    useEffect(() => {
            const userData = JSON.parse(localStorage.getItem("User") || "{}");
            if (userData._id) {
                setUser(userData._id);
            }
        }, []);
    
    const handleGenreSelection = async (genre:any) => {
          setSelectedGenre(genre);
          await generateGenreLyrics(genre);
        };


        const generateGenreLyrics = async (genre:any) => {
          try {
            const prompt = `mood: ${genre}, lyrics:`;
            const response = await axios.post(
              'http://127.0.0.1:5000/generate-genre',
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
  
        const addToCollection = async () =>{
          if (!title || !lyrics || !selectedGenre || !user){
            setError("Missing fields");
          return;
          }
          try{
            const userData = JSON.parse(localStorage.getItem("User") || "{}");
  
            if (!userData._id){
              setError("User not found");
              return;
            }
  
            console.log("Adding lyric:", { title, lyrics, selectedGenre, user: userData._id });
  
            const response = await axios.post("http://127.0.0.1:8080/lyrics/create", {
              title,
              content: lyrics,
              user: userData._id,
              genre: { name: selectedGenre },
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


    <div className={styles.body3}>


<div className={styles.Title1}> <h1>Choose a Genre and feel the harmony</h1></div>


<div className={styles.imageGrid}>
        {['Hip-hop', 'Funk', 'Jazz', 'Affrobeat', 'Heavy-Metal', 'Country'].map((genre) => (
          <div key={genre} className={styles.image} onClick={() => handleGenreSelection(genre)}>
          
          </div>
        ))}
      </div>
      
   
<div className={styles.Title1}> <h1>Didn't find any? search more </h1></div>  


<div className="dropdown dropdown-hover dropdown-right dropdown-end">
  
</div>
   
   



        </div>
     );
}
 
export default Genre;