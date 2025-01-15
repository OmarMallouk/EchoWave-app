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


    




    return ( 
      <div className={styles.body6}>


        </div>
    );
}

export default SingleChannel;