import { useEffect,useRef, useState } from "react";
import { Link } from "react-router-dom";
import lyricNote from "/assests/genrelyric.jpg?url";
import originalCh from "/assests/originalCheck.jpg?url";
import writing from "/assests/writing.jpg?url";
import styles from "./Home.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);




const Home = () => {
   const [userId, setUserId] = useState('');

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(`.${styles.featuresTitle}`, {
    scrollTrigger: {
      trigger: `.${styles.featuresTitle}`,
      start: "top 80%", 
      toggleActions: "play none none reverse",
      markers: false, 
    },
    opacity: 1,
    y: 0,
    duration: 1,
  });

  gsap.fromTo(
    `.${styles.fadeInSection}`,
    { opacity: 0, y: 50 }, 
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.3, 
      scrollTrigger: {
        trigger: `.${styles.featuresContainer}`, 
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );

}, []);


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("User") || "{}");
           if (userData._id) {
                 setUserId(userData._id);
               }
           }, []);

           
  

//  useEffect(() => {
//     const fetchUserLyrics = async (id: string) => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8080/users/`, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         console.log(response.data); 
//         setUsers(response.data);
//         setChannels(response.data.channel);
//       } catch (error) {
//         console.error("Error fetching lyrics", error);
//       }
//     };

//     if (userId) {
//       fetchUserLyrics(userId); 
//     }
//   }, [userId]);
   
//   console.log("users", users);
  

    return ( 
        <div>
        <div className={styles.hero}>
        <div className={styles.content}>
    <h1 className={styles.title}>
      Unique Exclusive <span className={styles.highlightLyrics}>Lyrics</span>, <br />
      <span className={styles.subtitle}>
        Just for <span className={styles.highlightYou}>You</span>
      </span>
    </h1>
    <p className={styles.description}>
      Transform your ideas into original <span className={styles.highlightMagic}>lyrics</span> with the power of AI. 
      Whether you’re a budding <span className={styles.highlightMagic}>songwriter</span> or a seasoned <span className={styles.highlightMagic}>musician</span>, 
      our platform helps you craft songs that reflect your unique <span className={styles.highlightMagic}>voice</span>,  
      <span className={styles.highlightMagic}> style</span>, and <span className={styles.highlightMagic}>mood</span> instantly.
    </p>
    <div className={styles.heroWrap}>
      <h2 className={styles.intro1}>Not a member yet?</h2>
      <button className={styles.control}>Get started</button>
    </div>
  </div>
      </div>

      {/* second section */}

      <div className={styles.featuresContainer}>
  <h2 className={`${styles.featuresTitle} fadeInSection`}>Features</h2>
  <div className={styles.featuresRow}>
        <div className={`${styles.fadeInSection}`}>
        <Link to="/mood" className={styles.featureItem}>
            <img src={lyricNote} alt="Writing Feature" className={styles.featureImage} />
            <h3 className={styles.featureHeading}>
            “Craft <span className={styles.highlight}>Lyrics</span> That Match Your <br /><span className={styles.highlight}>Mood</span>”
            </h3>
            <p className={styles.featureDescription}>
              Let your emotions guide the words as our AI tailors lyrics to fit the genre you choose.
            </p>
            <Link to="/mood" className={styles.featureButton}>Check Now</Link>
          </Link>
        </div>

        <div className={`${styles.fadeInSection}`}>
        <Link to="/genre" className={styles.featureItem}>
            <img src={originalCh} alt="Lyric Note Feature" className={styles.featureImage} />
            <h3 className={styles.featureHeading}>
            “Tailored <span className={styles.highlight}>Lyrics</span> for Every <br /><span className={styles.highlight}>Genre</span>”
            </h3>
            <p className={styles.featureDescription}>
              Whether it’s hip-hop, rock, or country, our AI crafts lyrics that flow smoothly with your chosen style.
            </p>
            <Link to="/genre" className={styles.featureButton}>Check Now</Link>
            </Link>
        </div>

        <div className={`${styles.fadeInSection}`}>
        <Link to="/origin" className={styles.featureItem}>
            <img src={writing} alt="Originality Check Feature" className={styles.featureImage} />
            <h3 className={styles.featureHeading}>
            “Stay Unique with our Originality <br /><span className={styles.highlight}>Feature</span>”
            </h3>
            <p className={styles.featureDescription}>
              Get instant feedback on your lyrics’ uniqueness and spot similarities with existing songs effortlessly.
            </p>
            <Link to="/origin" className={styles.featureButton}>Check Now</Link>
            </Link>
        </div>
      </div>
</div>

            {/* <div className={styles.chane}>Channels</div> 



<div className={styles.carouselsCo}>
  
              <div className={styles.container2}>
    <div className={styles.carousel}>
      <div className={styles.carousel__face}><span>This is something</span></div>
      <div className={styles.carousel__face}><span>Very special</span></div>
      <div className={styles.carousel__face}><span>Special is the key</span></div>
      <div className={styles.carousel__face}><span>For you</span></div>
      <div className={styles.carousel__face}><span>Just give it</span></div>
      <div className={styles.carousel__face}><span>A try</span></div>
      <div className={styles.carousel__face}><span>And see</span></div>
      <div className={styles.carousel__face}><span>How IT Works</span></div>
      <div className={styles.carousel__face}><span>Woow</span></div>
    </div>
  </div>

</div> */}

</div>

      
    );
}

export default Home;
