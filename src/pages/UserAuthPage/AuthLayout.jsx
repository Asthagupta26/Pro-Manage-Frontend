import React from "react";
import styles from "./AuthLayout.module.css";
import welcome from "../../assets/images/welcome.png";

function AuthLayout() { 


  return (
   <>
   <div className={styles.container}>
        <img src={welcome} className={styles.welcomeImg} />
        <h1 className={styles.heading}>Welcome aboard my friend</h1>
        <p className={styles.paragraph}>just a couple of clicks and we start</p>
      </div>
   </>
  ) 
}

export default AuthLayout;

