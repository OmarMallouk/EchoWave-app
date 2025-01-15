import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Lyric,  Song, User } from "@/lib/Types";
import { Link, useLocation } from "react-router-dom";
import styles from "./SingleChannel.module.css";

const SingleChannel = () => {
    const { id } = useParams();
    const location = useLocation();
    const producer = location.state?.producer;
    const [user, setUser] = useState<User>({
      channelName: '',
      description: '',
      username: '',
      profile_picture: '',
      _id: '',
      role:'',
      bookmarkedChannels: [],
      });
      const [userIds, setUserIds] = useState('');
      const [userLyrics, setUserLyrics] = useState<Lyric[]>([]);
      const [selectedSong, setSelectedSongs] = useState<Song | null>(null);
      const [showModal, setShowModal] = useState(false); 
      const [songs, setSongs] = useState<Song[]>([]);
      const [comments, setComments] = useState<Song["comments"]>([]);
      const [newComment, setNewComment] = useState("");
      const [previousData, setPreviousData] = useState(null);
      const [error, setError] = useState("");
      const [channelData, setChannelData] = useState<any>(null);
      const [loading, setLoading] = useState(true);


    

    useEffect(() => {
      if (producer) {
        setUserLyrics(producer.lyrics || []);
        setSongs(producer.songs || []);
        setChannelData(producer.data);
        setPreviousData(producer.data);
        setLoading(false);
        setUser(producer);
      } else {
        const fetchChannelDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/users/${id}`);
            setChannelData(response.data);
            setUser(response.data);
            setSongs(response.data.songs || []);
            setPreviousData(response.data);
            setUserLyrics(response.data.lyrics || []);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching channel details:", error);
            setLoading(false);
          }
        };
        fetchChannelDetails();
      }
    }, [producer, id]);

  

       useEffect(() => {
                const userData = JSON.parse(localStorage.getItem("User") || "{}");
                if (userData._id) {
                  setUserIds(userData._id);
                }
            }, []);


    if (loading) return <p>Loading...</p>;

    console.log("the user is:", user);
    

    
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
          const response = await axios.post(
            "http://127.0.0.1:8080/users/comment",
            {
              userId: userIds,
              songId: selectedSong?._id,
              comment: newComment,
            },
            { headers: { "Content-Type": "application/json" } }
          );
      
          if (response.status === 200) {
            const updatedComment = response.data.updatedSong.comments?.slice(-1)[0];
            setComments((prevComments = []) => (updatedComment ? [...prevComments, updatedComment] : prevComments));
            setNewComment("");
          } else {
            console.error("Failed to add comment:", response.data.message);
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error adding comment:", error.message);
          } else {
            console.error("Unexpected error:", error);
          }
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


      const bookmarkChannel = async (userId:any, producerId:any) => {
        try {
          const response = await axios.post('http://127.0.0.1:8080/users/bookmark', { userId:userIds, producerId: user._id});
          console.log(response.data.message); 
        } catch (error) {
          console.error("Error bookmarking channel:", error);
          alert("Something went wrong. Please try again.");
        }
      };


      const handleBookmark = (producerId: string) => {
        const userId = userIds;  
        bookmarkChannel(userId, producerId);
      };

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
   
   <button className={styles.bookbtn} onClick={() => handleBookmark(producer._id)}>Bookmark Channel</button>

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
        <div className={styles.commentHeader}>
          <img
            src={`http://localhost:8080${comment.profile_picture}`}
            alt="User profile"
            className={styles.profilePicture}
          />
        </div>
        <div className={styles.commentContent}>
         
          <p><strong>user:</strong> {comment.username}</p>
          <p>comment: {comment.content}</p>
          <p><small>{new Date(comment.created_at).toLocaleString()}</small></p>
        </div>
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

        </div>
    );
}

export default SingleChannel;