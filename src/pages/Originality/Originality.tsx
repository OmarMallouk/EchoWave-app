import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextInput  } from '@mantine/core';
import styles from './Originalty.module.css';
import {
    Dropdown,
    Ripple,
    initTWE,
  } from "tw-elements";



const Originality = () => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    const [submittedLyrics, setSubmittedLyrics] = useState('');
    const [lyricResult, setLyricResult] = useState([]);
    const [userLyrics, setUserLyrics] = useState<any[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [selectedLyric, setSelectedLyric] = useState<string>("");

    initTWE({ Dropdown, Ripple });

         useEffect(() => {
            const userData = JSON.parse(localStorage.getItem("User") || "{}");
            if (userData._id) {
              setUserId(userData._id);
            }
        }, []);

        useEffect(() => {
          const fetchUserLyrics = async (id: string) => {
            try {
              const response = await axios.get(`http://127.0.0.1:8080/users/${id}`, {
                headers: {
                  "Content-Type": "application/json",
                },
              });
              console.log(response.data); 
              setUserLyrics(response.data.lyrics || []); 
            } catch (error) {
              console.error("Error fetching lyrics", error);
            }
          };
      
          if (userId) {
            fetchUserLyrics(userId); 
          }
        }, [userId]);
    

        useEffect(() => {
          if (lyricResult) {
              console.log("Lyric Result:", lyricResult);
          }
      }, [lyricResult]);


    const handleSubmission = async (lyrics:any) =>{
      setSubmittedLyrics(lyrics);
      await generatedScore(lyrics);
    };




   


    return ( 

        <div className={styles.body4}>
<div className={styles.Title2}> <h1>Want to check your lyrics <span>originality</span>?</h1></div>

<div className={styles.gridContainer}>
  <div className={styles.gridItem}>
    <h1>Drop your lyrics below</h1>
    <input type="text" placeholder="Write here" className={styles.inputField}  value={value} 
    onChange={(e) => setValue(e.target.value)} />
    <button className={styles.btn} onClick={() => handleSubmission(value)}>Submit</button>
  </div>


  <div className={styles.gridItem}>
    <h1>Choose from your list</h1>
    <select className={styles.dropdown} onChange={handleDropdownChange}>
      <option value="" disabled selected>Select an option</option>
      {userLyrics.map((lyric:any, index:number) =>(
        <option key={index} value={lyric.content}>{lyric.title}</option>
      ))}
    </select>
    <button className={styles.btn} onClick={handleDropdownSubmit}>
            Submit Selected
          </button>
  </div>
</div>


<div className={styles.flexContainer2}>
                <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-4">
                    <div className={styles.card}>
                    {lyricResult && lyricResult.length > 0 ? (
                lyricResult.map((result: any, index: number) => (
                    <div key={index}>
                      <p><strong>Artist:</strong> {result.artist}</p>
                      <p><strong>Track:</strong> {result.track}</p>
                        <p><strong>Lyric:</strong> {result.lyric}</p>
                        <p><strong>Similarity Score:</strong> {result.similarity}</p>
                    </div>
                ))
            ) : (
                "Waiting for results"
            )}
        </div>
                    <div className="divider lg:divider-horizontal">
                        <h1 className={styles.divider}>OR</h1>
                    </div>
                    <div className={styles.card}>Alternative Approach</div>
                </div>
            </div>

</div>
     );
}
 
export default Originality;