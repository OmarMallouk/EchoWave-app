import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Channel.module.css";
import channel4 from "/assests/writing.jpg?url";
import { Lyric,  Song, User } from "@/lib/Types";

const Channel = () => {
   const [user, setUser] = useState<User>({
    channelName: '',
    description: '',
    username: '',
    profile_picture: '',
    _id: '',
     });
    const [userId, setUserId] = useState('');
    const [userLyrics, setUserLyrics] = useState<Lyric[]>([]);
    const [selectedSong, setSelectedSongs] = useState<Song | null>(null);
    const [title, setTitle] = useState('');
    const [lyrics, setLyrics] = useState(null); 
    const [showModal, setShowModal] = useState(false); 
    const [selectedForMerge, setSelectedForMerge] = useState<string[]>([]);
    const [songs, setSongs] = useState<Song[]>([]);
    const [newSong, setNewSong] = useState("");
    const [isSelecting, setIsSelecting] = useState(false);
    const [comments, setComments] = useState<Song["comments"]>([]);
    const [newComment, setNewComment] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      channelName: "",
      description: "",
      username: "",
    });
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [previousData, setPreviousData] = useState(null);
    const [error, setError] = useState("");


    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("User") || "{}");
         if (userData._id) {
               setUserId(userData._id);
             }
         }, []);


        //  useEffect(() => {
        //   const userData = JSON.parse(localStorage.getItem("User") || "{}");
        //      if (userData._id) {
        //            setUserId(userData._id);
        //          }
        //      }, []);
      
        useEffect(() => {
          const fetchUserLyrics = async (id: string) => {
            try {
              const response = await axios.get(`http://127.0.0.1:8080/users/${id}`, {
                headers: {
                  "Content-Type": "application/json",
                },
              });
        
              if (response.data.id !== previousData) {
                setUser(response.data);
                setUserLyrics(response.data.lyrics || []);
                setSongs(response.data.songs || []);
                setPreviousData(response.data);
              }
              console.log(response.data);
            } catch (error) {
              console.error("Error fetching lyrics", error);
            }
          };
        
          if (userId) {
            fetchUserLyrics(userId);
          }
        }, [userId]); 

        
            const openModal = () => setIsModalOpen(true);
            const closeModal = () => setIsModalOpen(false);
          
            const handleInputChange = (e: any) => {
              const { name, value } = e.target;
              setFormData({ ...formData, [name]: value });
            };

            const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                setProfilePicture(e.target.files[0]);
              }
            };
          
            const handleSubmit = async () => {
              const form = new FormData();
              if (formData.channelName) form.append("channelName", formData.channelName);
              if (formData.description) form.append("description", formData.description);
              if (formData.username) form.append("username", formData.username);
              if (profilePicture) form.append("profile_picture", profilePicture);

              if (profilePicture) {
                  form.append("profile_picture", profilePicture); 
              }
          
              try {
                  const response = await axios.put(`http://127.0.0.1:8080/users/${userId}`, form, {
                      headers: {
                      },
                  });
          
                  if (response.status === 200) {
                      const data = response.data;
                      console.log("User updated successfully:", data);
                      closeModal(); 
                  } else {
                      console.error("Failed to update user:", response.data);
                  }
              } catch (error) {
                  console.error("Error updating user:", error);
              }
          };

          const addToCollection = async () =>{
            if (!title || !newSong || !userId){
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
                content: newSong,
                user: userData._id,
              },{
                headers:{
                  "Content-Type": "application/json",
                },
              });
    
              if (response.status === 200){
                setSongs([...songs, response.data]); 
                setNewSong("");
                setTitle("");
                console.log("lyric added: ", response.data);
                
              }else{
                setError("Failed to add collection");
              }
            }catch(error){
              console.error("Error adding collection", error);
              setError("Something went wrong :(");
            }
          };
             

         const handleOpenModal = (songs: Song) => {
          setSelectedSongs(songs);
            setComments(songs.comments || []);
            setShowModal(true);
          };

        console.log("selected", selectedSong);
        
        const handleCloseModal = () => {
          setSelectedSongs(null);
          setComments(selectedSong?.comments || []);
          setShowModal(false);
        };


          const handleCommentChange = (e:any) => {
            setNewComment(e.target.value);
          };
          
          const handleAddComment = async () => {
            try {
              const userId = user._id; 
              const songId = selectedSong?._id;
              const comment = newComment;
          
              const response = await axios.post("http://127.0.0.1:8080/users/comment", {
                userId,
                songId,
                comment,
              }, {
                headers: {
                  "Content-Type": "application/json",
                },
              });
          
              if (response.status === 200) {
                setComments(prevComments => {
                  if (prevComments) {
                    const newComment = response.data.updatedSong.comments?.slice(-1)[0]; 
                    return newComment ? [...prevComments, newComment] : prevComments;
                  } else {
                    return [];
                  }
                });
                setNewComment("");
              } else {
                console.error(response.data.message); 
              }
            } catch (error) {
              console.error("Error adding comment", error);
            }
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
                console.log("Merged lyrics response:", response.data);
                if (response.status === 200) {
                  setNewSong(response.data.mergedLyrics);
                  setIsSelecting(false);
                  setSelectedForMerge([]);
                  console.log("Merged lyrics response:", response.data);
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
          
          console.log();
          

    return ( 
        <div className={styles.body6}>
             <div className={styles.profileContainer}>
 <div className={styles.profileInfo}>
   <h1 className={styles.profileTitle}>{user.channelName}</h1>
   <p className={styles.profileDescription}>
     "{user.description}"
   </p>
 </div>
 <div className={styles.profileImage}>
   <img src={`http://localhost:8080${user.profile_picture}`} alt="spacing out"/>
   
   <button className={styles.editButton} onClick={openModal}>  Edit Channel</button>

   {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Channel</h2>
             <input
              type="text"
              name="username"
              placeholder="Enter new username"
              value={formData.username}
              onChange={handleInputChange}
              className={styles.input}
            />
             <input
              type="text"
              name="description"
              placeholder="Enter new description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.input}
            />
             <input
              type="text"
              name="channelName"
              placeholder="Enter new channel name"
              value={formData.channelName}
              onChange={handleInputChange}
              className={styles.input}
            />
           <div className={styles.fileInputWrapper}>
  <label htmlFor="fileUpload" className={styles.customFileButton}>
    Upload Profile Picture
  </label>
  <input
    type="file"
    id="fileUpload"
    name="profile_picture"
    className={styles.fileInput}
    onChange={handleFileChange}
  />
</div>
            <button onClick={handleSubmit} className={styles.saveButton}>
              Save Changes
            </button>
            <button onClick={closeModal} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}

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
{ Array.isArray(songs) && songs.length > 0 ? (
  songs.map((song) => (
    <div className={styles.lyricsContainer} key={song._id}>
      <div className={styles.lyricsTitle}>{song.title}</div>
      <button
        className={styles.viewLyricsButton}
        onClick={() => handleOpenModal(song)}
      >
        View Song Lyrics
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

      <div className={styles.addCommentContainer}>
        <h2>Comments for: {selectedSong?.title}</h2>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment} className={styles.addCommentButton}>
          Add Comment
        </button>

        {comments && comments.length > 0 ? (
          <div className={styles.commentsSection}>
            {comments.map((comment: any, index: number) => (
              <div key={index} className={styles.comment}>
                <p>{comment.content}</p>
                <p><strong>User:</strong> {comment.user}</p>
                <p><small>{new Date(comment.created_at).toLocaleString()}</small></p>
              </div>
            ))}
          </div>
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
      <h2>Select Two Lyrics to Merge</h2>
      <div>
        {userLyrics.map((lyric) => (
          <div key={lyric._id} className={styles.lyricsSelection}>
            <input
              type="checkbox"
              checked={selectedForMerge.includes(lyric.content)}
              onChange={() => handleSelectForMerge(lyric.content)}
            />
            <label>{lyric.title}</label>
          </div>
        ))}
      </div>
      <button onClick={handleMergeLyrics} className={styles.mergeButton}>
        Merge Selected Lyrics
      </button>
    </div>
  </div>
)}

<div className={`${styles.gridContainer}`}>
  {newSong ? (
    <div className={`${styles.lyricsCard}`}>
      <h2>Generated Lyrics</h2>
      <p>{newSong}</p>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter Title"
          className={styles.inputField}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className={styles.addButton} onClick={addToCollection}
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

        </div>
     );
}
 
export default Channel;