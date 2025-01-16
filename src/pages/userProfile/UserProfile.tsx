import { useState, useEffect } from "react";
import styles from "./UserProfile.module.css";
import axios from "axios";
import channel1 from "/assests/space3.jpeg?url";
import channel2 from "/assests/angry1.jpeg?url";
import channel3 from "/assests/happy2.jpeg?url";
import channel4 from "/assests/writing.jpg?url";
import channel5 from "/assests/records5.jpeg?url";
import { Lyric, UserLyrics, User } from "@/lib/Types";
import { Link } from "react-router-dom";

interface Props {
    userLyrics: UserLyrics;
  }

const UserProfile = () => {
    const [user, setUser] = useState<User>({
      channelName: '',
      description: '',
      username: '',
      profile_picture: '',
      _id: '',
      role: '',
      bookmarkedChannels: [],
       });
const [bookmarkedChannels, setBookmarkedChannels] =  useState<User['bookmarkedChannels']>([]);
const [userId, setUserId] = useState('');
const [userLyrics, setUserLyrics] = useState<Lyric[]>([]);
const [selectedLyrics, setSelectedLyrics] = useState<string | null>(null);
const [showModal, setShowModal] = useState(false); 
const [currentIndex, setCurrentIndex] = useState(0);
const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      description: "",
      username: "",
    });
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
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
        const fetchUser = async (id: string) => {
          try {
            const response = await axios.get(`http://127.0.0.1:8080/users/${id}`, {
              headers: { "Content-Type": "application/json" },
            });
            if (response.data._id !== user._id) {
              setUser(response.data);
            }
          } catch (error) {
            console.error("Error fetching user data", error);
          }
        };
    
        if (userId) {
          fetchUser(userId);
        }
      }, [user]);
  

       useEffect(() => {
           const fetchUserLyrics = async (id: string) => {
             try {
               const response = await axios.get(`http://127.0.0.1:8080/users/${id}`, {
                 headers: {
                   "Content-Type": "application/json",
                 },
               });
               console.log(response.data); 
               setUser(response.data);
               setUserLyrics(response.data.lyrics || []); 
             } catch (error) {
               console.error("Error fetching lyrics", error);
             }
           };
       
           if (userId) {
             fetchUserLyrics(userId); 
           }
         }, [userId]);


         const fetchBookmark = async () => {
          try {
            const dataPromises = user.bookmarkedChannels.map(id => axios.get(`http://localhost:8080/users/${id}`));
            const dataResults = await Promise.all(dataPromises);
            setBookmarkedChannels(dataResults.map(res => res.data));
            console.log("Fetched Bookmarked Channels:", dataResults.map(res => res.data));
          } catch (error) {
            console.error("Error fetching bookmarked channels:", error);
          }
        };
        
        useEffect(() => {
          fetchBookmark();
        }, [user.bookmarkedChannels]);

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
           if (formData.description) form.append("description", formData.description);
           if (formData.username) form.append("username", formData.username);
           if (profilePicture) form.append("profile_picture", profilePicture);
           try {
               const response = await axios.put(`http://127.0.0.1:8080/users/${userId}`, form, {
                   headers: {
                   },
               });
       
               if (response.status === 200) {
                setUser(response.data);
                setUserLyrics(response.data.lyrics || []);
                  closeModal(); 
               } else {
                   console.error("Failed to update user:", response.data);
               }
           } catch (error) {
               console.error("Error updating user:", error);
           }
       };

         

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

     console.log("bookmarks", bookmarkedChannels);
     

   return ( 
       <div className={styles.body6}>
              <div className={styles.profileContainer}>
 <div className={styles.profileInfo}>
   <h1 className={styles.profileTitle}>{user.username}</h1>
   <p className={styles.profileDescription}>
    {user.description}
   </p>
 </div>
 <div className={styles.profileImage}>
   <img src={`http://localhost:8080${user.profile_picture}`} alt="Luna Vega"/>
   
   <button className={styles.editButton} onClick={openModal}> Edit Profile</button>

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






<div className={styles.Title1}> <h1>Created Lyrics </h1></div>  

<div
 className={styles.lyricsList}
 style={{
   maxHeight: userLyrics?.length > 3 ? "300px" : "auto",
   overflowY: userLyrics?.length > 3 ? "auto" : "visible",
 }}
>
 {userLyrics?.length > 0 ? (
   userLyrics.map((lyric) => (
     <div className={styles.lyricsContainer} key={lyric._id}>
       <div className={styles.lyricsTitle}>{lyric.title}</div>

       <button
         className={styles.viewLyricsButton}
         onClick={() => handleOpenModal(lyric.content)}
       >
         View Lyrics
       </button>
     </div>
   ))
 ) : (
   <div>No lyrics available.</div>
 )}
</div>

{showModal && (
       <>
         <div className={styles.modalOverlay} onClick={handleCloseModal}></div>
         <div className={styles.lyricsModal}>
           <button className={styles.closeModal} onClick={handleCloseModal}>
             &times;
           </button>
           <h2>Lyrics</h2>
           <p>{selectedLyrics}</p>
           <button onClick={handleDownload} className={styles.downloadButton}>
             Download Lyrics
           </button>
         </div>
       </>
     )}

     
<div className={styles.Title2}> <h1>Bookmarked Channels </h1></div>  

<div className={styles.carouselContainer}>
     <button className={`${styles.carouselButton} ${styles.carouselButtonPrev}`} onClick={prevImage}>
       &#10094;
     </button>


     <div className={styles.carousel}>
       {bookmarkedChannels.map((bookmark) => (
          <Link 
          key={bookmark._id} 
          to={`/singleChannel/${bookmark._id}`}
          state={{ bookmark }} 
          className={styles.card}
        >
         <div className={styles.carouselItem}>
           <img className={styles.carouselImage} src={`http://localhost:8080${bookmark.profile_picture}`} alt={bookmark.channelName} />
           <div className={styles.carouselTitle}>{bookmark.channelName}</div>
           
         </div>
         </Link>
       ))}
     </div>

     <button className={`${styles.carouselButton} ${styles.carouselButtonNext}`} onClick={nextImage}>
       &#10095;
     </button>
   </div>


 
       </div>
    );
}

export default UserProfile;