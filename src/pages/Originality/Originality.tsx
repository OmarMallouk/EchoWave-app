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
    <span className="ms-2 w-2 [&>svg]:h-5 [&>svg]:w-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd" />
      </svg>
    </span>
  </button>
  <ul
    className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
    aria-labelledby="dropdownMenuButton1"
    data-twe-dropdown-menu-ref>
    <li>
      <a
        className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
        href="#"
        data-twe-dropdown-item-ref
        >Action</a>
    </li>
    <li>
      <a
        className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
        href="#"
        data-twe-dropdown-item-ref
        >Another action</a>
    </li>
    <li>
      <a
        className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
        href="#"
        data-twe-dropdown-item-ref
        >Something else here</a>
    </li>
  </ul>
</div>
      
</div>
  




</div>
     );
}
 
export default Originality;