import React, { useEffect, useState } from "react";
import { getDetails } from "../../apis/task";
import styles from "./Analytics.module.css";
import analytics from "../../assets/icons/analytics.png";

const Analytics = () => {
  const [info, setInfo] = useState({});
  const user = localStorage.getItem("email");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await getDetails(user);
        setInfo(result);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [user]);

  const renderDataBlock = (label, value) => (
    <div className={styles.data}>
      <div className={styles.info}>
        <img
          src={analytics}
          alt={`${label} icon`}
          className={styles.analyticsImg}
        />
        {label}
      </div>
      <span className={styles.value}>{value}</span>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Analytics</div>
      <div className={styles.subContainer}>
        <div className={styles.boxOne}>
          <div className={styles.subBoxOne}>
            {renderDataBlock("Backlog Tasks", info?.backlogTasks)}
            {renderDataBlock("To-do Tasks", info?.todoTasks)}
            {renderDataBlock("In-Progress Tasks", info?.progressTasks)}
            {renderDataBlock("Completed Tasks", info?.completedTasks)}
          </div>
        </div>
        <div className={styles.boxTwo}>
          <div className={styles.subBoxTwo}>
            {renderDataBlock("Low Priority", info?.lowPriority)}
            {renderDataBlock("Moderate Priority", info?.moderatePriority)}
            {renderDataBlock("High Priority", info?.highPriority)}
            {renderDataBlock("Due Date Tasks", info?.dueDateTasks)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
