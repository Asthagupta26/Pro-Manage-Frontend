import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css";

function Logout({ setLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.innerBox}>
          <p className={styles.heading}>Are you sure you want to Logout?</p>

          <button onClick={handleLogout} className={styles.logout}>
            Yes, Logout
          </button>

          <button onClick={() => setLogout(false)} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
