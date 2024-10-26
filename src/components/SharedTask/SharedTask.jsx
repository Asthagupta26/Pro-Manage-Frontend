import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SharedTask.module.css";
import lowPriorityImg from "../../assets/icons/green_circle.png";
import moderatePriorityImg from "../../assets/icons/blue_circle.png";
import highPriorityImg from "../../assets/icons/pink_circle.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchTaskById } from "../../apis/task";
import codesandbox from "../../assets/icons/codesandbox.png";

function SharedTask() {
  const [taskDetails, setTaskDetails] = useState({});
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState("");
  const { id } = useParams();
  const [taskNotFound, setTaskNotFound] = useState(false);

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

  useEffect(() => {
    const today = new Date();
    setMonth(months[today.getMonth()]);
    fetchTask(id);
  }, [id, months]);

  const fetchTask = async (taskId) => {
    let result = await fetchTaskById(taskId);
    console.log(result);
    if (!result) {
      setTaskNotFound(true);
      console.log(taskNotFound)
    } else {
      setTaskDetails(result);
      setTaskNotFound(false);
    }
    console.log(taskNotFound)
  };

  return (
    <>
      {taskNotFound ?
        <>
          <div className={styles.taskNotFound}>
            <h2>404</h2>

            <h2>Task Not Found or Deleted</h2>
          </div>
        </>
        : <div className={styles.container}>
          <div className={styles.box}>
            <img src={codesandbox} />
            <h1 className={styles.heading}>Pro Manage</h1>
          </div>
          <div className={styles.task}>
            <div className={styles.innerBox}>
              <div className={styles.boxOne}>
                {taskDetails?.priority === "Low" && <img src={lowPriorityImg} />}
                {taskDetails?.priority === "Moderate" && (
                  <img src={moderatePriorityImg} />
                )}
                {taskDetails?.priority === "High" && <img src={highPriorityImg} />}
                <span className={styles.priority}>
                  {taskDetails?.priority?.toUpperCase()} PRIORITY
                </span>
              </div>

              <h4 className={styles.boxTwo}>{taskDetails?.title}</h4>
              <div className={styles.checklist}>
                <span>
                  Checklist ({taskDetails?.checkedNumber} /{" "}
                  {taskDetails?.tasks?.length})
                </span>
              </div>

              <div className={styles.checklistBox}>
                {taskDetails?.tasks?.map((subItem, index) => {
                  return (
                    <div key={index} className={styles.taskBox}>
                      <input
                        type="checkbox"
                        name="checkbox"
                        checked={taskDetails?.checkedTasks[index]}
                        className={styles.checkbox}
                        onClick={() =>
                          toast("Read Only!", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          })
                        }
                      />

                      <p className={styles.taskInput} name="task" type={"text"}>
                        {subItem}
                      </p>
                    </div>
                  );
                })}
              </div>

              {taskDetails?.dueDate !== null ? (
                <div className={styles.dueDate}>
                  <p className={styles.dateStyle}>Due Date</p>
                  <span className={styles.dateStatus}>{taskDetails?.dueDate}</span>
                </div>
              ) : (
                <span></span>
              )}
            </div>
            <ToastContainer />
          </div>
        </div >
      }
    </>
  )
}

export default SharedTask;
