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

<div className={styles.Title2}> <h1>Want to check your lyrics <span>originality</span>?</h1></div>


<div className={styles.gridContainer}>
  <div className={styles.gridItem}>
    <h1>Drop your lyrics below</h1>
    <input type="text" placeholder="Write here" className={styles.inputField} />
    <button className={styles.btn}>Submit</button>
  </div>


  <div className={styles.gridItem}>
    <h1>Choose from your list</h1>
    <select className={styles.dropdown}>
      <option value="" disabled selected>Select an option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
  </div>


  {/* <div className={styles.gridItem}>
    <h1>Upload your file here</h1>
    <div className={styles.customFileUpload}>
    <label htmlFor="fileInput" className={styles.uploadLabel}>
      Select File
    </label>
    <input type="file" id="fileInput" className={styles.fileInput} />
  </div>
  </div> */}
</div>

<div className={styles.flexContainer2}>
  <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-4">
    <div className={styles.card}>Waiting for results</div>
    <div className="divider lg:divider-horizontal"><h1 className={styles.divider}>OR</h1></div>
    <div className={styles.card}>Alternative Approach</div>
  </div>
</div>




</div>
     );
}
 
export default Originality;