import React, { useState } from "react";
import AuthLayout from "../../pages/UserAuthPage/AuthLayout";
import styles from "./Register.module.css";
import email from "../../assets/icons/email.png";
import lock from "../../assets/icons/lock.png";
import name from "../../assets/icons/name.png";
import show from '../../assets/icons/show.svg';
import hide from '../../assets/icons/hide.svg';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/userAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const result = await registerUser(formData);
      if (result.status === 201) {
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
          handleLoginClick();
        }, 3000);
      } else {
        toast.error("User already exists", {
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

  return (
    <div className={styles.container}>
      <div className={styles.authLayoutContainer}>
        <AuthLayout />
      </div>
      <div className={styles.box}>
        <div className={styles.registerContainer}>
          <h1>Register</h1>
          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            <div className={styles.inputParentBox}>
              <div className={styles.inputBox}>
                <img src={name} className={styles.icon} />
                <input
                  placeholder="Name"
                  className={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>

            <div className={styles.inputParentBox}>
              <div className={styles.inputBox}>
                <img src={email} className={styles.icon} />
                <input
                  placeholder="Email"
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                />
                <div style={{ cursor: "pointer" }} onClick={togglePasswordVisibility}>
                  {passwordShown ? <img src={hide} className={styles.icon} /> : <img src={show} className={styles.icon} />}
                </div>
              </div>
              {errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </div>

            <div className={styles.inputParentBox}>
              <div className={styles.inputBox}>
                <img src={lock} className={styles.icon} />
                <input
                  placeholder="Confirm Password"
                  className={styles.input}
                  type={confirmPasswordShown ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <div style={{ cursor: "pointer" }} onClick={toggleConfirmPasswordVisibility}>
                  {confirmPasswordShown ? <img src={hide} className={styles.icon} /> : <img src={show} className={styles.icon} />}
                </div>
              </div>
              {errors.confirmPassword && (
                <p className={styles.error}>{errors.confirmPassword}</p>
              )}
            </div>

            <button type="submit" className={styles.register}>
              Register
            </button>
            <p className={styles.text}>Have an account?</p>
            <button className={styles.login} onClick={handleLoginClick}>
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
