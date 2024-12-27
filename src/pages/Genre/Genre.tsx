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
            <img src={`https://picsum.photos/300/300?random=${mood}`} alt={mood} />
            <div className={styles.imageText}>{mood}?</div>
          </div>
        ))}
      </div>
      
   
<div className={styles.Title1}> <h1>Didn't find any? search more </h1></div>  


<div className="dropdown dropdown-hover dropdown-right dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1">Moods</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
   

<div className="w-full">
  <div className="mx-auto py-24 sm:px-6 sm:py-32 lg:px-8">
    <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0 w-full">
      <svg
        viewBox="0 0 1024 1024"
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
      >
        <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
        <defs>
          <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
            <stop stopColor="#7775D6" />
            <stop offset={1} stopColor="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
      <div className="mx-auto text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-center w-full max-w-full">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Your Generated Output:
        </h2>
        <p className="mt-6 text-pretty text-lg text-gray-300">
        {aiOutput || 'Select a mood to generate content.'}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-center">
          <a
            href="#"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
     );
}
 
export default Genre;