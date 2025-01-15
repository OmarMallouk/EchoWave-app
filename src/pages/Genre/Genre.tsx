import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./Genre.module.css"
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
gsap.registerPlugin(ScrollTrigger);


const genreImages = [
  { genre: 'Hip-hop', imageSrc: '/assests/genre/hip-hop.jpg' },
  { genre: 'Funk', imageSrc: '/assests/genre/funk.jpg' },
  { genre: 'Jazz', imageSrc: '/assests/genre/jazz.jpg' },
  { genre: 'Affrobeat', imageSrc: '/assests/genre/affrobeat.jpg' },
  { genre: 'Heavy-metal', imageSrc: '/assests/genre/heavy-metal.jpg' },
  { genre: 'Country', imageSrc: '/assests/genre/country.jpg' },
  { genre: 'Broadway', imageSrc: '/assests/genre/broadway.jpg' },
  { genre: 'Gospel', imageSrc: '/assests/genre/gospel.jpg' },
];


const Genre = () => {

  const [selectedGenre, setSelectedGenre] = useState('');
   const [lyrics, setLyrics] = useState(null); 
    const [title, setTitle] = useState('');
    const [user, setUser] = useState('');
    const [error, setError] = useState("");

    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
      imageRefs.current.forEach((ref) => {
        gsap.fromTo(
          ref,
          { y: gsap.utils.random(100, 50), x: gsap.utils.random(-50, 50) },
          {
            y: 0,
            x: 0,
            stagger: 0.5,
            scrollTrigger: {
              trigger: ref,
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


<div className={styles.Title1}> <h1>Pick a Genre and immerse yourself in the <span>rhythm</span>.</h1></div>


<div className={styles.imageGrid}>
        {genreImages.map(({genre, imageSrc}, index) => (
          <div key={genre} className={styles.image} ref={(el) => (imageRefs.current[index] = el)} onClick={() => handleGenreSelection(genre)} >
            <img src={imageSrc} alt={genre} />
            <div className={styles.imageText}>{genre}</div>
          </div>
        ))}
      </div>
      
   
<div className={styles.Title1}> <h1>Didn't find any? search <span>more</span> </h1></div>  


<div className="dropdown dropdown-hover dropdown-right dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1">Genre</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    {['Funk', 'Mid-Night-Jazz', 'Soft-Blues', 'hard-Rock'].map((genre) => (
      <li key={genre}>
        <a onClick={() => handleGenreSelection(genre)}>{genre}</a>
      </li>
    ))}
  </ul>
</div>
   
   
<div className={`${styles.gridContainer}`}>
{lyrics ? (

    <div className={`${styles.lyricsCard}`}>
      <h2>Generated Lyrics for <span>{selectedGenre}</span></h2>
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

): (
  <div className={`${styles.lyricsCard}`}>
  <h2>No Lyrics Yet</h2>
  <p>Choose lyrics to create a song</p>
</div>
)}
  </div>

        </div>
     );
}
 
export default Genre;