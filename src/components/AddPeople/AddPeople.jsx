import React, { useState } from "react";
import { addUser } from "../../apis/task";
import { ToastContainer, toast } from "react-toastify";
import User from "../User/User";
import "react-toastify/dist/ReactToastify.css";
import styles from "./AddPeople.module.css";

function AddPeople({ setAddPeople }) {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  const handleCancel = () => {
    setAddPeople(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddPeople = async () => {
    if (!email) {
      showToast("Email field can't be empty");
      return;
    }

    if (!isValidEmail(email)) {
      showToast("Invalid Email");
      return;
    }

    try {
      const result = await addUser(email);

      if (result) {
        setUser(email);
      } else {
        showToast("User already exists");
      }
    } catch (error) {
      showToast("Something went wrong. Please try again.");
    }
  };

  const showToast = (message) => {
    toast(message, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const isValidEmail = (email) => /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.innerBox}>
          <p className={styles.text}>Add people to the board</p>

          <input
            className={styles.input}
            name="email"
            id="email"
            placeholder="Enter the email"
            value={email}
            onChange={handleEmailChange}
            type={"email"}
          ></input>

          <div className={styles.buttonBox}>
            <button onClick={handleCancel} className={styles.cancel}>
              Cancel
            </button>

            <button
              onClick={() => handleAddPeople()}
              className={styles.addPeople}
            >
              Add Email
            </button>
          </div>
        </div>
      </div>
      {user !== null && (
        <User user={user} setUser={setUser} setAddPeople={setAddPeople} />
      )}
      <ToastContainer />
    </div>
  );
}

export default AddPeople;
