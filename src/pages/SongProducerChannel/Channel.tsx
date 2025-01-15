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
              if (profilePicture) form.append("profile_picture", profilePicture);
          
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


  

    return ( 
        <div className={styles.body6}>
      
 
        </div>
     );
}
 
export default Channel;