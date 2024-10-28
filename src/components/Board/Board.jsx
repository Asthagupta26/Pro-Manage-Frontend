import React, { useEffect, useState } from "react";
import styles from "./Board.module.css";
import addPeopleImg from "../../assets/icons/addPeople.png";
import AddPeople from "../AddPeople/AddPeople";
import Backlog from "../Backlog/Backlog";
import InProgress from "../InProgress/InProgress";
import Done from "../Done/Done";
import ToDo from "../ToDo/ToDo";

const Board = () => {
  const name = localStorage.getItem("name");
  const [day, setDay] = useState(() => {
    const today = new Date();
    return today.getDate();
  });
  const [month, setMonth] = useState(() => {
    const today = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[today.getMonth()];
  });

  const [year, setYear] = useState(() => new Date().getFullYear());
  const [trigger, setTrigger] = useState(true);
  const [addPeople, setAddPeople] = useState(false);
  const [timeStamp, setTimeStamp] = useState("This Week");
  const handleAddPeople = () => setAddPeople(true);

  const handleTimeStampChange = (e) => {
    const { value } = e.target;
    if (["Today", "This Week", "This Month"].includes(value)) {
      setTimeStamp(value);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.nameDisplay}>
        <span className={styles.welcomeMessage}>Welcome! {name}</span>
        <span className={styles.date}>
          {day} {month}, {year}
        </span>
      </div>
      <div className={styles.heading}>
        <div className={styles.board}>
          <div className={styles.boardHead}>Board</div>
          <span className={styles.addPeople} onClick={handleAddPeople}>
            <img src={addPeopleImg} />
            <span className={styles.addPeopleText}>Add People</span>
          </span>
        </div>
        <select
          className={styles.selectTime}
          type="text"
          name="timestamp"
          value={timeStamp}
          onChange={(e) => handleTimeStampChange(e)}
        >
          <option className={styles.option} id="today" defaultValue="">
            Today
          </option>
          <option selected className={styles.option} id="week" defaultValue="">
            This Week
          </option>
          <option className={styles.option} id="month" defaultValue="">
            This Month
          </option>
        </select>
      </div>
      <div className={styles.tasksContainer}>
        <Backlog
          trigger={trigger}
          setTrigger={setTrigger}
          timeStamp={timeStamp}
        />
        <ToDo trigger={trigger} setTrigger={setTrigger} timeStamp={timeStamp} />
        <InProgress
          trigger={trigger}
          setTrigger={setTrigger}
          timeStamp={timeStamp}
        />
        <Done trigger={trigger} setTrigger={setTrigger} timeStamp={timeStamp} />
      </div>
      {addPeople && <AddPeople setAddPeople={setAddPeople} />}
    </div>
  );
};

export default Board;
