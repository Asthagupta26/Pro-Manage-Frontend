import React, { useState } from "react";
import { updateUserName, updateUserDetails } from "../../apis/userAuth";
import { useNavigate } from "react-router-dom";
import styles from "./Settings.module.css";
import nameIcon from "../../assets/icons/name.png";
import emailIcon from "../../assets/icons/email.png";
import lockIcon from "../../assets/icons/lock.png";
import show from '../../assets/icons/show.svg';
import hide from '../../assets/icons/hide.svg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Settings() {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [oldName, setOldName] = useState(localStorage.getItem("name") || "");
  const [oldEmail, setOldEmail] = useState(localStorage.getItem("email") || "");

  const [userData, setUserData] = useState({
    name: oldName,
    email: oldEmail,
    oldPassword: "",
    newPassword: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordShown(!newPasswordShown);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const { name, email, oldPassword, newPassword } = userData;

    if (
      oldName !== name &&
      oldEmail === email &&
      !newPassword &&
      !oldPassword
    ) {
      toast.success("User details are successfully updated", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      await updateUserName(email, name);
      localStorage.setItem("name", name);
      return;
    }

    if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
      toast.error("Please enter both passwords", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const result = await updateUserDetails(oldEmail, userData);

    if (result === true) {
      toast.success("User details are successfully updated", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.clear();
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      toast.error("Incorrect Old Password", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Settings</h3>
      <div className={styles.box}>
        <div className={styles.inputBox}>
          <img src={nameIcon} alt="Name Icon" className={styles.icon} />
          <input
            className={styles.input}
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleFormChange}
            type="text"
          />
        </div>

        <div className={styles.inputBox}>
          <img src={emailIcon} alt="Email Icon" className={styles.icon} />
          <input
            className={styles.input}
            name="email"
            placeholder="Update Email"
            value={userData.email}
            onChange={handleFormChange}
            type="email"
          />
        </div>

        <div className={styles.inputBox}>
          <img src={lockIcon} alt="Lock Icon" className={styles.icon} />
          <input
            className={styles.input}
            name="oldPassword"
            placeholder="Old Password"
            value={userData.oldPassword}
            onChange={handleFormChange}
            type={passwordShown ? "text" : "password"}
          />
          <div style={{ cursor: "pointer" }} onClick={togglePasswordVisibility}>
            {passwordShown ? <img src={show} className={styles.icon} /> : <img src={hide} className={styles.icon} />}
          </div>
        </div>

        <div className={styles.inputBox}>
          <img src={lockIcon} alt="Lock Icon" className={styles.icon} />
          <input
            className={styles.input}
            name="newPassword"
            placeholder="New Password"
            value={userData.newPassword}
            onChange={handleFormChange}
            type={newPasswordShown ? "text" : "password"}
          />
          <div style={{ cursor: "pointer" }} onClick={toggleNewPasswordVisibility}>
            {newPasswordShown ? <img src={show} className={styles.icon} /> : <img src={hide} className={styles.icon} />}
          </div>
        </div>

        <button onClick={handleUpdate} className={styles.update}>
          Update
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Settings;
