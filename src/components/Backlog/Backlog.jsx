import React, { useEffect, useState } from "react";
import styles from "./Backlog.module.css";
import { getTask, updateTaskQueueById, fetchTaskById } from "../../apis/task";
import collapseAll from "../../assets/icons/collapse-all.png";
import lowPriorityImg from "../../assets/icons/green_circle.png";
import moderatePriorityImg from "../../assets/icons/blue_circle.png";
import highPriorityImg from "../../assets/icons/pink_circle.png";
import dots from '../../assets/icons/dots.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip';
import arrowDown from '../../assets/icons/arrow-down.png';
import arrowUp from '../../assets/icons/arrow-up.png';
import Task from "../Task/Task";
import Delete from "../Delete/Delete";


function Backlog({ trigger, setTrigger, timeStamp }) {

    const user = localStorage.getItem("email");
    const [collapseAllVal, setCollapseAllVal] = useState(true);
    const [backlogTask, setBacklogTask] = useState([]);
    const [day, setDay] = useState(new Date().getDate());
    const [month, setMonth] = useState("");
    const [checklistVisibility, setChecklistVisibility] = useState([]);
    const [taskOptions, setTaskOptions] = useState([]);
    const [taskDetails, setTaskDetails] = useState({});
    const [deleteVal, setDeleteVal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [task, setTask] = useState(false);

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

    const fetchBacklogTasks = async () => {
        const result = await getTask("Backlog", timeStamp, user);
        setBacklogTask(result);
        let array = [];
        let popUpArray = [];
        for (let i = 0; i < result?.length; i++) {
            array.push(0);
            popUpArray.push(false); 
        }

        setChecklistVisibility([...array]);
        setTaskOptions([...popUpArray]);
    };

    useEffect(() => {
        const today = new Date();
        setMonth(months[today.getMonth()]);

        fetchBacklogTasks();
    }, []);
     useEffect(() => {
        handleCollapseAll();  
    }, [collapseAllVal]);

    const handleCollapseAll = () => {
        let array = [];
        if (collapseAllVal) {
            for (let i = 0; i < checklistVisibility?.length; i++) {
                array.push(0);
            }
        } else {
            for (let i = 0; i < checklistVisibility?.length; i++) {
                array.push(1);
            }
        }
        setChecklistVisibility([...array]);
    };

    const editTask = async (taskId) => {
        let result = await fetchTaskById(taskId);
        setTaskDetails(result);
        setTask(true);
    };


    const handleCheckbox = (event, taskIndex, checklistIndex) => {
        let checkedTasks = backlogTask[taskIndex]?.checkedTasks;
        let checkedNumber = backlogTask[taskIndex].checkedNumber;

        if (event.target.checked === true) {
            checkedTasks[checklistIndex] = true;
            checkedNumber = checkedNumber + 1;
        } else {
            checkedTasks[checklistIndex] = false;
            checkedNumber = checkedNumber - 1;
        }

        let backlogTaskObj = backlogTask[taskIndex];
        backlogTaskObj = {
            ...backlogTaskObj,
            ['checkedTasks']: checkedTasks,
            ['checkedNumber']: checkedNumber,  
        };

        let backlogTaskArr = backlogTask;
        backlogTaskArr[taskIndex] = backlogTaskObj;
        setBacklogTask([...backlogTaskArr]);
    };

    const openTaskOptions = (index) => {
        let popUpArray = taskOptions;
        popUpArray[index] = !taskOptions[index];
        setTaskOptions([...popUpArray]);
    };

    const changeQueue = async (id, queue) => {
        let result = await updateTaskQueueById(id, queue);
        if (result === true) {
            setTrigger(!trigger);
        }
    };
    const handleDelete = (taskId) => {
        setTaskToDelete(taskId);
        setDeleteVal(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.headingBox}>
                <div className={styles.heading}>Backlog</div>
                <img
                    src={collapseAll}
                    onClick={() => {
                        collapseAllVal ? setCollapseAllVal(false) : setCollapseAllVal(true);
                    }}
                    className={styles.collapse}
                />
            </div>

            <div className={styles.taskContainer}>
                {backlogTask?.map((item, index) => {
                    return (
                        <div key={index} className={styles.task}>
                            <div className={styles.innerBox}>
                                <div className={styles.boxOne}>
                                    <span>
                                        {item?.priority === 'Low' && <img src={lowPriorityImg} />}
                                        {item?.priority === 'Moderate' && (
                                            <img src={moderatePriorityImg} />
                                        )}
                                        {item?.priority === 'High' && <img src={highPriorityImg} />}
                                        <span className={styles.priorityText}>
                                            {item?.priority?.toUpperCase()} PRIORITY
                                        </span>
                                        <span>
                                            {item?.assignedTo ? (
                                                <span
                                                    title={item?.assignedTo}
                                                    className={styles.assignedTo}
                                                >
                                                    {item?.assignedTo?.slice(0, 2)?.toUpperCase()}
                                                </span>
                                            ) : (
                                                <span></span>
                                            )}
                                        </span>
                                    </span>

                                    <img
                                        src={dots}
                                        onClick={() => openTaskOptions(index)}
                                        className={styles.popUpDots}
                                    />
                                </div>

                                {taskOptions[index] === true && (
                                    <div className={styles.popUp}>
                                        <button
                                            className={styles.edit}
                                            onClick={() => editTask(item?._id)}
                                        >
                                            Edit
                                        </button>

                                        <CopyToClipboard
                                            text={`http://localhost:5173/sharedtask/${item._id}`}
                                            onCopy={() =>
                                                toast.success('Link Copied', {
                                                    position: 'top-right',
                                                    autoClose: 4000,
                                                    hideProgressBar: true,
                                                    closeOnClick: false,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: 'colored',
                                                })
                                            }
                                        >
                                            <button className={styles.share}>Share</button>

                                        </CopyToClipboard>

                                        <button

                                            className={styles.delete}
                                            onClick={() => handleDelete(item?._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}

                                {item?.title?.length < 20 ? (
                                    <div className={styles.title}>{item?.title}</div>
                                ) : (
                                    <>
                                        <div className={styles.title} title={item?.title} id="title">
                                            {item?.title?.slice(0, 19)}...
                                        </div>
                                        <Tooltip title place="top">
                                            {item.title}
                                        </Tooltip>
                                    </>
                                )}

                                <div className={styles.checklist}>
                                    <span className={styles.checklistHeading}>
                                        Checklist ({item?.checkedNumber} / {item?.tasks.length})
                                    </span>
                                    {checklistVisibility[index] === 0 ? (
                                        <img
                                            src={arrowDown}
                                            onClick={() => {
                                                let array = checklistVisibility;
                                                array[index] = 1;
                                                setChecklistVisibility([...array]);
                                            }}
                                            className={styles.expandCollapse}
                                        />
                                    ) : (
                                        <img
                                            src={arrowUp}
                                            onClick={() => {
                                                let array = checklistVisibility;
                                                array[index] = 0;
                                                setChecklistVisibility([...array]);
                                            }}
                                            className={styles.expandCollapse}
                                        />
                                    )}
                                </div>

                                <div style={{
                                    display:
                                        checklistVisibility[index] === 0 ? 'none' : 'block',
                                }}>
                                    {item?.tasks.map((subItem, i) => {
                                        return (
                                            <div className={styles.taskBox} key={i}>
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => handleCheckbox(e, index, i)}
                                                    name="checkbox"
                                                    checked={item?.checkedTasks[i]}
                                                    className={styles.checkbox}
                                                />

                                                <p
                                                    className={styles.taskInput}
                                                    name="task"
                                                    type={'text'}
                                                >
                                                    {subItem}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className={styles.lastBox}>
                                    {item?.dueDate !== null ? (
                                        <span
                                            style={{
                                                background:
                                                    months.indexOf(item?.dueDate?.split(' ')[0]) <
                                                        months.indexOf(month) ||
                                                        (months.indexOf(item?.dueDate?.split(' ')[0]) ===
                                                            months.indexOf(month) &&
                                                            Number(item?.dueDate?.split(' ')[1]) < day)
                                                        ? '#CF3636'
                                                        : '#DBDBDB',
                                                color:
                                                    months.indexOf(item?.dueDate?.split(' ')[0]) <
                                                        months.indexOf(month) ||
                                                        (months.indexOf(item?.dueDate?.split(' ')[0]) ===
                                                            months.indexOf(month) &&
                                                            Number(item?.dueDate?.split(' ')[1]) < day)
                                                        ? 'white'
                                                        : 'black',
                                            }}
                                            className={styles.dateStatus}
                                        >
                                            {item?.dueDate}
                                        </span>
                                    ) : (
                                        <span></span>
                                    )}
                                    <span className={styles.queueBox}>
                                        <span
                                            className={styles.queueOptions}
                                            onClick={() => changeQueue(item?._id, 'Todo')}
                                        >
                                            TO-DO
                                        </span>
                                        <span
                                            className={styles.queueOptions}
                                            onClick={() => changeQueue(item?._id, 'In Progress')}
                                        >
                                            PROGRESS
                                        </span>
                                        <span
                                            className={styles.queueOptions}
                                            onClick={() => changeQueue(item?._id, 'Done')}
                                        >
                                            DONE
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {task && (
                <Task
                    setTask={setTask}
                    taskDetails={taskDetails}
                    setTaskDetails={setTaskDetails}
                />
            )}
            {deleteVal && (
                <Delete
                    setDeleteVal={setDeleteVal}
                    taskToDelete={taskToDelete}
                    trigger={trigger}
                    setTrigger={setTrigger}
                />
            )}

            <ToastContainer />
        </div>
    )
}

export default Backlog;
