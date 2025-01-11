import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Channel.module.css";
import channel4 from "/assests/writing.jpg?url";
import { Lyric, UserLyrics, Song } from "@/lib/Types";

const Channel = () => {
    const [userId, setUserId] = useState('');
    const [userLyrics, setUserLyrics] = useState<Lyric[]>([]);
    const [selectedSong, setSelectedSongs] = useState<Song | null>(null);
    const [title, setTitle] = useState('');
    const [lyrics, setLyrics] = useState(null); 
    const [showModal, setShowModal] = useState(false); 
    const [selectedForMerge, setSelectedForMerge] = useState<string[]>([]);
    const [songs, setSongs] = useState<Song[]>([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [comments, setComments] = useState<Song["comments"]>([]);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState("");


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
                   setSongs(response.data.songs || []); 

                  //  console.log("The comments are: ",comments)
                 } catch (error) {
                   console.error("Error fetching lyrics", error);
                 }
               };
           
               if (userId) {
                 fetchUserLyrics(userId); 
               }
             }, [userId]);
            //  console.log("The comments are: ",comments)
             
         const handleOpenModal = (songs: Song) => {
          setSelectedSongs(songs);
            setComments(songs.comments || []);
            console.log("selected lyrics:", selectedSong)
            setShowModal(true);
          };

          console.log("selected lyrics:", selectedSong)
        
          const handleCloseModal = () => {
            setSelectedSongs(null);
            setShowModal(false);
          };


          const handleDownload = () => {
            if (selectedSong) { 
              const element = document.createElement("a");
              const file = new Blob([selectedSong.content], { type: "text/plain" });
              element.href = URL.createObjectURL(file);
              element.download = `${selectedSong.title}.txt`;
              document.body.appendChild(element); 
              element.click();
            }
          };


          const addToCollection = async () =>{
            if (!title || !lyrics || !userId){
              setError("Missing fields");
            return;
            }
            try{
              const userData = JSON.parse(localStorage.getItem("User") || "{}");
    
              if (!userData._id){
                setError("User not found");
                return;
              }
    
              console.log("Adding lyric:", { title, lyrics, userId: userData._id });
    
          
            }catch(error){
              console.error("Error adding collection", error);
              setError("Something went wrong :(");
            }
          };
          



          
    return ( 
        <div className={styles.body6}>
   






        </div>
     );
}
 
export default Channel;