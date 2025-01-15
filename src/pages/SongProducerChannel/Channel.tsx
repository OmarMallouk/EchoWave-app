import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Channel.module.css";
import channel4 from "/assests/writing.jpg?url";
import { Lyric,  Song, User } from "@/lib/Types";
import { Link } from "react-router-dom";

const Channel = () => {
   const [user, setUser] = useState<User>({
    channelName: '',
    description: '',
    username: '',
    profile_picture: '',
    _id: '',
    role:'',
    bookmarkedChannels: [],
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

        
      
     
    return ( 
        <div className={styles.body6}>
      
 
        </div>
     );
}
 
export default Channel;