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
    
              const response = await axios.post("http://127.0.0.1:8080/api/createSong", {
                title,
                content: lyrics,
                user: userData._id,
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
          

          const handleStartMerge = () => {
            setIsSelecting(true);
          };

          const handleSelectForMerge = (lyric: string) => {
            if (selectedForMerge.includes(lyric)) {
              setSelectedForMerge(selectedForMerge.filter((item) => item !== lyric));
            } else if (selectedForMerge.length < 2) {
              setSelectedForMerge([...selectedForMerge, lyric]);
            }
          };


          const handleMergeLyrics = async () => {
            if (selectedForMerge.length === 2) {
              try {
                const [lyric1, lyric2] = selectedForMerge;
                const response = await axios.post("http://127.0.0.1:8080/api/lyrics/merge-lyrics", {
                  lyrics1: lyric1,
                  lyrics2: lyric2,
                });
          
                if (response.status === 200) {
                  setSongs(response.data.mergedLyrics);
                  setIsSelecting(false);
                  setSelectedForMerge([]);
                } else {
                  console.error("Error merging lyrics:", response.data.error);
                  alert("Failed to merge lyrics. Please try again.");
                }
              } catch (error) {
                console.error("Error merging lyrics:", error);
              }
            } else {
              alert("Please select exactly two lyrics to merge.");
            }
          };
          
          console.log("selected song", selectedSong);
          
    return ( 
        <div className={styles.body6}>
             <div className={styles.profileContainer}>
 <div className={styles.profileInfo}>
   <h1 className={styles.profileTitle}>Writers</h1>
   <p className={styles.profileDescription}>
     "I am Righter joe 'FunkStar' Vega, a fearless rockstar with a passion for blending the raw energy of rock with the groovy soul of funk. My music is all about bold basslines, gritty guitar riffs, and infectious rhythms that get people moving. On stage, I bring a vibrant, electrifying presence, complete with neon-colored outfits and an unapologetic love for life. Offstage, I'm a dreamer, writing songs under the stars and living by my mantra: 'Stay groovy, stay true.'"
   </p>
 </div>
 <div className={styles.profileImage}>
   <img src={channel4} alt="spacing out"/>
   
   <button className={styles.editButton}> <span className={styles.editIcon}>✏️</span> Edit Channel</button>
 </div>
</div>



<div className={styles.Title1}> <h1>Created Songs</h1></div>  

<div
 className={styles.lyricsList}
 style={{
   maxHeight: userLyrics?.length > 3 ? "300px" : "auto",
   overflowY: userLyrics?.length > 3 ? "auto" : "visible",
 }}
>
 {songs?.length > 0 ? (
   songs.map((song) => (
     <div className={styles.lyricsContainer} key={song._id}>
       <div className={styles.lyricsTitle}>{song.title}</div>

       <button
         className={styles.viewLyricsButton}
         onClick={() => handleOpenModal(song)}
       >
         View Song lyrics <span role="img" aria-label="search icon">🔍</span>
       </button>
     </div>
   ))
 ) : (
   <div>No Song lyrics available.</div>
 )}
</div>


{showModal && (
       <>
         <div className={styles.modalOverlay} onClick={handleCloseModal}></div>
         <div className={styles.lyricsModal}>
           <button className={styles.closeModal} onClick={handleCloseModal}>
             &times;
           </button>
           <h2>Song lyrics</h2>
           <p>{selectedSong?.content || "No lyrics available."}</p>
           <button onClick={handleDownload} className={styles.downloadButton}>
             Download Song lyrics
           </button>

           <div>
  <h2>Comments for: {selectedSong?.title}</h2>
  {comments && comments.length > 0 ? (
    comments.map((comment: any, index: number) => (
      <div key={index} style={{ marginBottom: "10px", padding: "5px", border: "1px solid #ccc" }}>
        <p>{comment.content}</p>
        <p><strong>User:</strong> {comment.user}</p>
        <p><small>{new Date(comment.created_at).toLocaleString()}</small></p>
      </div>
    ))
  ) : (
    <p>No comments available for this song.</p>
  )}
</div>
         </div>
       </>
     )}

<div className={styles.buttonContainer}>
  <button onClick={handleStartMerge} className={styles.control2}>
    Create a New Song <span>+</span>
  </button>
</div>


    {isSelecting && (
  <div className={styles.modalOverlay}>
    <div className={styles.lyricsModal}>
      <button className={styles.closeModal} onClick={() => setIsSelecting(false)}>
        &times;
      </button>
    
      <button onClick={handleMergeLyrics} className={styles.mergeButton}>
        Merge Selected Lyrics
      </button>
    </div>
  </div>
)}



        </div>
     );
}
 
export default Channel;