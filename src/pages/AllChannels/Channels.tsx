import React ,{ useState, useEffect } from "react";
import styles from "./Channels.module.css";
import { url } from "inspector";
import originalCh from "/assests/originalCheck.jpg?url";
import writing from "/assests/writing.jpg?url";
import channel1 from "/assests/records5.jpeg?url";

const popularData = [
    { id: 1, title: "Channel One", image: originalCh },
    { id: 2, title: "Channel Two", image: writing },
    { id: 3, title: "Channel Three", image: channel1 },
    { id: 4, title: "Channel Three", image: channel1 },
    { id: 4, title: "Channel Three", image: channel1 },
    { id: 4, title: "Channel Three", image: channel1 },
  ];

  const data = [
    { channel: channel1, song: "Song A", views: "1.2M" },
    { channel: channel1, song: "Song B", views: "850K" },
    { channel: channel1, song: "Song C", views: "540K" },
  ];

const Channels = () => {

  
    return ( 
        <div className={styles.body5}>


    </div>

        </div>
     );
}
 
export default Channels;