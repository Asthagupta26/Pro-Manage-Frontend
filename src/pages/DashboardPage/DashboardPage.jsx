import React, { useState, useEffect } from "react";
import styles from "./DashboardPage.module.css";
import Board from "../../components/Board/Board";
import Analytics from "../../components/Analytics/Analytics";
import Settings from "../../components/Settings/Settings";
import Logout from "../../components/Logout/Logout";
import codesandbox from "../../assets/icons/codesandbox.png";
import layout from "../../assets/icons/layout.png";
import database from "../../assets/icons/database.png";
import setting from "../../assets/icons/settings.png";
import logoutImg from "../../assets/icons/logout.png";

function DashboardPage() {
  const [component, setComponent] = useState(1);
  const [logout, setLogout] = useState(false);

  const handleComponentChange = (componentIndex) => {
    setComponent(componentIndex);
  };

  useEffect(() => {
    document.querySelectorAll(`.${styles.box}`).forEach((el, idx) => {
      el.style.background = idx === component ? "#D6EAF4" : "none";
    });
  }, [component]);

  const renderComponent = () => {
    switch (component) {
      case 1:
        return <Board />;
      case 2:
        return <Analytics />;
      case 3:
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.subContainer}>
          <div className={styles.box}>
            <img src={codesandbox} alt="Pro Manage logo" />
            <h1 className={styles.heading}>Pro Manage</h1>
          </div>

          {[layout, database, setting].map((icon, index) => (
            <div
              key={index}
              className={styles.box}
              onClick={() => handleComponentChange(index + 1)}
            >
              <img src={icon} alt="icon" />
              <button className={component - 1 === index ? styles.button : styles.buttonGrey}>
                {["Board", "Analytics", "Settings"][index]}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.logout} onClick={() => setLogout(true)}>
          <img src={logoutImg} alt="logout icon" />
          <button className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
      {renderComponent()}
      {logout && <Logout setLogout={setLogout} /> }
    </div>
  );
}

export default DashboardPage;
