import React, { useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from "./Mood.module.css";
import axios from 'axios';
import { toast, ToastContainer  } from 'react-toastify';

gsap.registerPlugin(ScrollTrigger);

const moodImages = [
  { mood: 'Sad', imageSrc: '/assests/mood/sad.jpg' },
  { mood: 'Angry', imageSrc: '/assests/mood/angry.jpg' },
  { mood: 'Happy', imageSrc: '/assests/mood/happy.jpg' },
  { mood: 'Stressed', imageSrc: '/assests/mood/stressed.jpg' },
  { mood: 'Ecstatic', imageSrc: '/assests/mood/ecstatic.jpg' },
  { mood: 'Depressed', imageSrc: '/assests/mood/depressed.jpg' },
  { mood: 'Envy', imageSrc: '/assests/mood/joy.jpg' },
  { mood: 'Loved', imageSrc: '/assests/mood/loved.jpg' },
];

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [lyrics, setLyrics] = useState(null); 
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let timerId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => func(...args), delay);
    };
  };

  const animateImages = useCallback(() => {
    const images = document.querySelectorAll<HTMLDivElement>(`.${styles.image}`);

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

  const debouncedAnimate = useCallback(debounce(animateImages, 100), [animateImages]);

  useEffect(() => {
    debouncedAnimate();
  }, [debouncedAnimate]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("User") || "{}");
    if (userData._id) {
      setUser(userData._id);
    }
  }, []);

  const handleMoodSelection = async (mood: any) => {
    setSelectedMood(mood);
    setLoading(true); 
    await generateMoodLyrics(mood);
    setLoading(false); 

    const lyricsCard = document.querySelector(`.${styles.gridContainer}`);
    if (lyricsCard) {
      lyricsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const generateMoodLyrics = async (mood: any) => {
    try {
      const prompt = `mood: ${mood}, lyrics:`;
      const response = await axios.post(
        'http://35.181.154.194:5000/generate-mood',
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

  const addToCollection = async () => {
    if (!title || !lyrics || !selectedMood || !user) {
      setError("Missing fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const userData = JSON.parse(localStorage.getItem("User") || "{}");

      if (!userData._id) {
        setError("User not found");
        return;
      }

      console.log("Adding lyric:", { title, lyrics, selectedMood, user: userData._id });

      const response = await axios.post("http://35.181.154.194:8000/lyrics/create", {
        title,
        content: lyrics,
        user: userData._id,
        mood: { name: selectedMood },
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Lyrics added successfully!");
        console.log("lyric added: ", response.data);

      } else {
        setError("Failed to add collection");
      }
    } catch (error) {
      console.error("Error adding collection", error);
      setError("Something went wrong :(");
    }finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.body2}> 

      <div className={styles.Title1}> 
        <h1>Choose a mood and feel the <span>harmony</span></h1>
      </div>

      {loading && <div className={styles.loading}>Loading...</div>}

      <div className={styles.imageGrid}>
        {moodImages.map(({mood, imageSrc}) => (
          <div key={mood} className={styles.image} onClick={() => handleMoodSelection(mood)}>
            <img src={imageSrc} alt={mood} />
            <div className={styles.imageText}>{mood}</div>
          </div>
        ))}
      </div>

      <div className={styles.Title1}> 
        <h1>Didn't find any? <span>search</span> </h1>
      </div>  

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

      <div className={`${styles.gridContainer}`}>
        {lyrics ? (
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
                onClick={addToCollection} disabled={isSubmitting}
              >
                Add to Collection
              </button>
            </div>
          </div>
        ) : (
          <div className={`${styles.lyricsCard}`}>
            <h2>No Lyrics Yet</h2>
            <p>Choose lyrics to create a song</p>
          </div>
        )}
      </div>    

      <ToastContainer />
    </div>          
  );
};

export default Mood;
