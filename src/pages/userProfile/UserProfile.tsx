import { useState, useEffect } from "react";
import styles from "./UserProfile.module.css";
import axios from "axios";
import channel1 from "/assests/space3.jpeg?url";
import channel2 from "/assests/angry1.jpeg?url";
import channel3 from "/assests/happy2.jpeg?url";
import channel4 from "/assests/writing.jpg?url";
import channel5 from "/assests/records5.jpeg?url";
import { Lyric, UserLyrics } from "@/lib/Types";

interface Props {
    userLyrics: UserLyrics;
  }

const UserProfile = () => {
const [userId, setUserId] = useState('');
const [userLyrics, setUserLyrics] = useState<Lyric[]>([]);
const [selectedLyrics, setSelectedLyrics] = useState<string | null>(null);
const [showModal, setShowModal] = useState(false); 
const [currentIndex, setCurrentIndex] = useState(0);
const imagesPerSlide = 3;


  const images = [
    { src: channel1, title: 'Title 1' },
    { src: channel2, title: 'Title 2' },
    { src: channel3, title: 'Title 3' },
    { src: channel4, title: 'Title 3' },
    { src: channel5, title: 'Title 3' },
  ];

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

         

         const handleOpenModal = (lyrics:any) => {
          setSelectedLyrics(lyrics);
          setShowModal(true);
        };
      
        const handleCloseModal = () => {
          setSelectedLyrics(null);
          setShowModal(false);
        };

        console.log("here",userLyrics);
         
        const nextImage = () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
        };
      
        const prevImage = () => {
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
          ); 
        };
      
        const visibleImages = [
          images[(currentIndex) % images.length],
          images[(currentIndex + 1) % images.length],
          images[(currentIndex + 2) % images.length],
        ];

        const handleDownload = () => {
          if (selectedLyrics) { 
            const element = document.createElement("a");
            const file = new Blob([selectedLyrics], { type: "text/plain" });
            element.href = URL.createObjectURL(file);
            element.download = "lyrics.txt";
            document.body.appendChild(element); 
            element.click();
          }
        };

     

   return ( 
       <div className={styles.body6}>
           

 
       </div>
    );
}

export default UserProfile;