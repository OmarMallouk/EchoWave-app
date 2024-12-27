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
      <TextInput
      placeholder='Write here'
      required
      className={styles.input}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ 'data-floating': floating }}
    />
    <button className={styles.submitButton}>Submit</button>
    </div>


    <div className={styles.centerDiv}>
      <h1>Choose from your list</h1>
      <div className="relative" data-twe-dropdown-ref>
  <button
    className="flex items-center rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
    type="button"
    id="dropdownMenuButton1"
    data-twe-dropdown-toggle-ref
    aria-expanded="false"
    data-twe-ripple-init
    data-twe-ripple-color="light">
    Dropdown button
 
  </button>

      
</div>
  




</div>
     );
}
 
export default Originality;