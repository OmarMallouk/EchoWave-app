import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Lyric,  Song, User } from "@/lib/Types";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
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
            const response = await axios.get(`http://35.181.154.194:8000/users/${id}`);
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
            "http://35.181.154.194:8000/users/comment",
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
            toast.success("Comment added successfully!");
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

      console.log(userIds);
      
      

      const bookmarkChannel = async (userId:any, producerId:any) => {
      
        try {
          const response = await axios.post('http://35.181.154.194:8000/users/bookmark', { userId:userIds, producerId: user._id});
          if (response.status == 200){
            toast.success("Channel bookmarked successfully!");
            console.log(response.data.message); 
          
        } else {
          console.error("Failed to bookmark:", response.data.message);
        }
        } catch (error) {
          console.error("Error bookmarking channel:", error);
          alert("Something went wrong. Please try again.");
        }
      };


      const handleBookmark = () => {
        const userId = userIds;  
        if (user) {
          bookmarkChannel(userId, user._id);
        } else {
          console.error("User data is undefined.");
        }
      };

    return ( 
      <div className={styles.body6}>

<div className={styles.channelLayout}>
  <div className={styles.leftSide}>
  <div className={styles.profileImage}>
  <img src={`http://35.181.154.194:8000${user.profile_picture}`} alt="Channel"  />
    <h2  className={styles.profileTitle}>Channel Name</h2>
    <p className={styles.profileDescription}>This is the channel description.</p>
    <button className={styles.bookbtn} onClick={() => handleBookmark()}>Bookmark Channel</button>
    </div>
  </div>


  <div className={styles.rightSide}>
  <div className={styles.buttonContainer}>
  <div className={styles.Title1}>
      <h1>Created Songs</h1>
    </div>

</div>

    


    <div
 className={styles.lyricsList}
 style={{
   maxHeight: userLyrics?.length > 3 ? "400px" : "auto",
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
            src={`http://35.181.154.194:8000${comment.profile_picture}`}
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


    
    
   <ToastContainer />
    </div>
    </div>
          );

}

export default SingleChannel;