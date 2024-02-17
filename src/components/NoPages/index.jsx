import React from 'react'
import styles from "./index.module.css"
import noimg from "./404no.webp"
 
export default function index() {
  return (
    
    <>
    <div className={styles.nopages}>
      <img src={noimg} alt="" />
    </div>
    </>

  )
}
