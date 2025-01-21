import React ,{ useState, useEffect } from "react";
import styles from "./Channels.module.css";
import { url } from "inspector";
import { Lyric,  Song, User } from "@/lib/Types";
import axios from "axios";
import originalCh from "/assests/originalCheck.jpg?url";
import writing from "/assests/writing.jpg?url";
import channel1 from "/assests/records5.jpeg?url";
import { Link } from "react-router-dom";

const Channels = () => {
  const [userId, setUserId] = useState('');
  const[channels, setChannels] = useState('');
  const [users, setUsers] = useState<User[]>([]);




       useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("User") || "{}");
           if (userData._id) {
                 setUserId(userData._id);
               }
           }, []);
  



  useEffect(() => {
    const fetchUserLyrics = async (id: string) => {
      try {
        const response = await axios.get(`http://35.181.154.194:8000/users/`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data); 
        setUsers(response.data);
        setChannels(response.data.channel);
      } catch (error) {
        console.error("Error fetching lyrics", error);
      }
    };

    if (userId) {
      fetchUserLyrics(userId); 
    }
  }, [userId]);

  const songProducers = users.filter((user) => user.role === "song_producer");
  
    return ( 
        <div className={styles.body5}>

<div className={styles.Title3}> <h1>Explore our Channels</h1></div>
            

<div className={styles.cardGrid}>
      {songProducers.map((item) => (
         <Link 
         key={item._id} 
         to={`/singleChannel/${item._id}`}
         state={{ item }} 
         className={styles.card}
       >
        <div key={item._id} className={styles.card}>
          <img
  src={item.profile_picture ? `http://localhost:8000${item.profile_picture}` : channel1}
  alt={item.channelName || "Default Channel Name"}
  className={styles.cardImage}
/>
          <h3 className={styles.cardTitle}>{item.channelName}</h3>
        </div>
        </Link>
      ))}
     
    </div>




        </div>
     );
}
 
export default Channels;