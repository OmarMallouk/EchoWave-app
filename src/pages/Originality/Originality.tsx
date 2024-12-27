import React from 'react';
import { useState, useEffect } from 'react';
import { TextInput  } from '@mantine/core';
import styles from './Originalty.module.css';
import {
    Dropdown,
    Ripple,
    initTWE,
  } from "tw-elements";



const Originality = () => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
     const [aiOutput, setAiOutput] = useState('');
    const floating = value.trim().length !== 0 || focused || undefined;

    initTWE({ Dropdown, Ripple });


    return ( 

        <div className={styles.body4}>

<div className={styles.Title2}> <h1>Want to check your lyrics originality?</h1></div>


<div className={styles.flexContainer}>
    <div className={styles.leftDiv}>
      <h1>Drop your lyrics below</h1>
  
    </div>


  




</div>
     );
}
 
export default Originality;