import React from "react";
import styles from "./AuthLayout.module.css";
import welcome from "../../assets/images/welcome.png";
import back from "../../assets/images/back.png";

function AuthLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={back} alt="" className={styles.backImg} />
        <img src={welcome} className={styles.welcomeImg} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.heading}>Welcome aboard my friend</h1>
        <p className={styles.paragraph}>just a couple of clicks and we start</p>
      </div>
    </div>
  );
}

export default AuthLayout;
