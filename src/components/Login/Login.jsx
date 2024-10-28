import React, { useState } from "react";
import AuthLayout from "../../pages/UserAuthPage/AuthLayout";
import styles from "./Login.module.css";
import email from "../../assets/icons/email.png";
import lock from "../../assets/icons/lock.png";
import show from '../../assets/icons/show.svg';
import hide from '../../assets/icons/hide.svg';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/userAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!userData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!userData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const result = await loginUser(userData);
      if (result.status === 200) {
        toast.success(result.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.error("Invalid Credentials", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className={styles.container}>
      <div className={styles.authLayoutContainer}>
        <AuthLayout />
      </div>
      <div className={styles.box}>
        <div className={styles.loginContainer}>
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputParentBox}>
              <div className={styles.inputBox}>
                <img src={email} className={styles.icon} />
                <input
                  placeholder="Email"
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            <div className={styles.inputParentBox}>
              <div className={styles.inputBox}>
                <img src={lock} className={styles.icon} />
                <input
                  placeholder="Password"
                  className={styles.input}
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleFormChange}
                  required
                />
                <div style={{ cursor: "pointer" }} onClick={togglePasswordVisibility}>
                  {passwordShown ? <img src={show} className={styles.icon} /> : <img src={hide} className={styles.icon} />}
                </div>
              </div>
              {errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </div>
            <button type="submit" onClick={handleSubmit} className={styles.login}>Login</button>
            <p className={styles.text}>Have no account yet?</p>
            <button type="submit" onClick={handleRegisterClick} className={styles.register}>Register</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
