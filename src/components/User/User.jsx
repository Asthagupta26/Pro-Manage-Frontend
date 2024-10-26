import React from "react";

import styles from "./User.module.css";

function User({ user, setUser, setAddPeople }) {
    const handleUser = () => {
        setUser(null);
        setAddPeople(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <div className={styles.innerBox}>
                    <p className={styles.text}>{user} added to board</p>

                    <button onClick={() => handleUser()} className={styles.user}>
                        Okay, got it!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default User;
