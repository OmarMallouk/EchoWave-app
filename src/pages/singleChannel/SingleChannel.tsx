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

 



    return ( 
      <div className={styles.body6}>


        </div>
    );
}

export default SingleChannel;