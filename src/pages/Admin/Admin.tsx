import React ,{ useState, useEffect } from "react";
import { Lyric,  Song, User } from "@/lib/Types";
import axios from "axios";
import styles from "./Admin.module.css";

const Admin = () => {
    const [userId, setUserId] = useState('');
      const[channels, setChannels] = useState('');
      const [users, setUsers] = useState<User[]>([]);


      useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("User") || "{}");
           if (userData._id) {
                 setUserId(userData._id);
               }
           }, []);
  



  useEffect(() => {
    const fetchUserLyrics = async (id: string) => {
      try {
        const response = await axios.get(`http://35.181.154.194:8000/users/`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data); 
        setUsers(response.data);
        setChannels(response.data.channel);
      } catch (error) {
        console.error("Error fetching lyrics", error);
      }
    };

    if (userId) {
      fetchUserLyrics(userId); 
    }
  }, [userId]);

  console.log(users);


  const deleteUser = async (id: string) => {
    try {
      const response = await axios.delete(`http://35.181.154.194:8000/users/${id}`);
      console.log('User deleted:', response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Error response:', error.response.data.message);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (confirm) {
      const result = await deleteUser(id);
      if (result) {
        alert('User deleted successfully!');
      }
    }
  };
  
    return ( 
        <div className={styles.body5}>
          
          
          <div className={styles.userList}>
      {users.map((user) => (
        <div key={user._id} className={styles.userCard}>
          <img
            src={`http://localhost:8000${user.profile_picture}`}
            alt={`${user.username}'s profile`}
            className={styles.profilePicture}
          />
          <div className={styles.userInfo}>
            <h4 className={styles.username}>{user.username}</h4>
            <p className={styles.channelName}>{user.channelName}</p>
          </div>
          <button
            className={styles.deleteButton} onClick={() => handleDelete(user._id)}
            
          >
            Delete
          </button>
        </div>
      ))}
    </div>

        </div>
     );
}
 
export default Admin;