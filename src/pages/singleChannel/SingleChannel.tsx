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
      





    return ( 
      <div className={styles.body6}>


        </div>
    );
}

export default SingleChannel;