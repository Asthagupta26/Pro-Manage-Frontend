import React, { useEffect, useState } from "react";
import { saveTask, updateTask, getAssignee } from "../../apis/task";
import styles from "./Task.module.css";
import pinkCircle from "../../assets/icons/pink_circle.png";
import greenCircle from "../../assets/icons/green_circle.png";
import blueCircle from "../../assets/icons/blue_circle.png";
import plusIcon from "../../assets/icons/plus.png";
import deleteIcon from "../../assets/icons/delete.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Task = ({ setTask, taskDetails, setTaskDetails }) => {
  const [checklist, setChecklist] = useState([]);
  const userEmail = localStorage.getItem("email");
  const [assignees, setAssignees] = useState([]);
  const [high, setHigh] = useState(false);
  const [moderate, setModerate] = useState(false);
  const [low, setLow] = useState(false);

  const [taskData, setTaskData] = useState({
    title: taskDetails?.title || "",
    priority: taskDetails?.priority || "",
    assignedTo: taskDetails?.assignedTo || "",
    queue: taskDetails?.queue || "Todo",
    tasks: taskDetails?.tasks || [],
    dueDate: taskDetails?.dueDate || null,
    checkedTasks: taskDetails?.checkedTasks || [],
    checkedNumber: taskDetails?.checkedNumber || 0,
    user: taskDetails?.email || userEmail,
  });

  useEffect(() => {
    localStorage.removeItem("isTaskCreated");

    if (taskDetails?._id) {
      setChecklist(
        Array.from({ length: taskDetails?.tasks.length }, (_, i) => i)
      );
      updatePriorityBackground();
    }

    fetchAssignees();
  }, [taskDetails]);

  const addNewTask = () => {
    setChecklist([...checklist, checklist.length ? checklist.at(-1) + 1 : 0]);
    setTaskData((prevState) => ({
      ...prevState,
      tasks: [...prevState.tasks, ""],
      checkedTasks: [...prevState.checkedTasks, false],
    }));
  };

  const handleTaskCheckbox = (event, index) => {
    const checkedTasks = [...taskData.checkedTasks];
    let checkedNumber = taskData.checkedNumber;

    if (event.target.checked) {
      checkedTasks[index] = true;
      checkedNumber++;
    } else {
      checkedTasks[index] = false;
      checkedNumber--;
    }

    setTaskData((prevState) => ({
      ...prevState,
      checkedTasks,
      checkedNumber,
    }));
  };

  const fetchAssignees = async () => {
    const response = await getAssignee();
    setAssignees(Array.from(response));
  };

  const handleInputChange = (event) => {
    const { name, id, value } = event.target;
    if (name === "title") {
      setTaskData({ ...taskData, title: value });
    } else if (name === "priority") {
      setTaskData({ ...taskData, priority: id });
      if (event.target.id === "High") {
        setHigh(true);
        setModerate(false);
        setLow(false);
      }
      if (event.target.id === "Moderate") {
        setHigh(false);
        setModerate(true);
        setLow(false);
      }
      if (event.target.id === "Low") {
        setHigh(false);
        setModerate(false);
        setLow(true);
      }
    }
  };

  const updatePriorityBackground = () => {
    if (taskData.priority === "High") {
      setHigh(true);
      setModerate(false);
      setLow(false);
    } else if (taskData.priority === "Moderate") {
      setHigh(false);
      setModerate(true);
      setLow(false);
    } else if (taskData.priority === "Low") {
      setHigh(false);
      setModerate(false);
      setLow(true);
    }
  };

  const removeTask = (index) => {
    const updatedChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(updatedChecklist);

    const updatedTasks = taskData.tasks.filter((_, i) => i !== index);
    const updatedCheckedTasks = taskData.checkedTasks.filter(
      (_, i) => i !== index
    );
    const updatedCheckedNumber = taskData.checkedTasks[index]
      ? taskData.checkedNumber - 1
      : taskData.checkedNumber;

    setTaskData((prevState) => ({
      ...prevState,
      tasks: updatedTasks,
      checkedTasks: updatedCheckedTasks,
      checkedNumber: updatedCheckedNumber,
    }));
  };

  const handleTaskChange = (event, index) => {
    const updatedTasks = [...taskData.tasks];
    updatedTasks[index] = event.target.value;

    setTaskData((prevState) => ({
      ...prevState,
      tasks: updatedTasks,
    }));
  };

  const cancelTask = () => {
    setTask(false);
    setTaskDetails({});
  };

  const selectDueDate = (date) => {
    setTaskData({ ...taskData, ["dueDate"]: date });
  };

  const handleAssigneeChange = (event) => {
    setTaskData({ ...taskData, assignedTo: event.target.value });
  };

  const handleSubmit = async () => {
    if (!taskData.title) {
      showToast("Please enter the title");
      return;
    }

    if (!taskData.priority) {
      showToast("Please select the priority");
      return;
    }

    if (!taskData.tasks.length || !taskData.tasks[0]) {
      showToast("Please enter at least one task");
      return;
    }

    if (taskData.tasks.some((task) => !task)) {
      showToast("Tasks can't be empty");
      return;
    }

    if (taskDetails?._id) {
      await updateTask(taskDetails._id, taskData);
      showToast("Task updated successfully");
    } else {
      await saveTask(taskData);
      showToast("Task created successfully");
    }
    setTimeout(() => {
      setTaskData({});
      setTask(false);
      window.location.reload();
    }, 3000);
  };

  const showToast = (message) => {
    toast(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.innerBox}>
          <label className={styles.label}>
            Title <span className={styles.asterisk}>*</span>
          </label>
          <input
            className={styles.input}
            name="title"
            placeholder="Enter Task Title"
            value={taskData.title}
            onChange={handleInputChange}
          />

          <div className={styles.priorityBox}>
            <label className={styles.label}>
              Select Priority <span className={styles.asterisk}>*</span>
            </label>
            <button
              className={high ? styles.buttonSelected : styles.button}
              name="priority"
              id="High"
              onClick={handleInputChange}
            >
              <img src={pinkCircle} className={styles.pinkCircle} />
              HIGH PRIORITY
            </button>

            <button
              className={moderate ? styles.buttonSelected : styles.button}
              name="priority"
              id="Moderate"
              onClick={handleInputChange}
            >
              <img src={blueCircle} className={styles.blueCircle} />
              MODERATE PRIORITY
            </button>

            <button
              className={low ? styles.buttonSelected : styles.button}
              name="priority"
              id="Low"
              onClick={handleInputChange}
            >
              <img src={greenCircle} className={styles.greenCircle} />
              LOW PRIORITY
            </button>
          </div>

          <div className={styles.assignee}>
            <label htmlFor="assignee" className={styles.label}>
              Assign to
            </label>
            <select
              className={styles.selectAssignee}
              name="assignee"
              value={taskData.assignedTo}
              onChange={handleAssigneeChange}
              disabled={taskDetails?._id && taskDetails.user !== userEmail}
            >
              <option value="" disabled hidden>
                Add an assignee
              </option>
              {assignees.map((person) => (
                <option key={person.email} value={person.email}>
                  {person.email}
                </option>
              ))}
            </select>
          </div>

          <label className={styles.label}>
            Checklist ({taskData.checkedNumber}/{checklist.length})
            <span className={styles.asterisk}>*</span>
          </label>

          <div className={styles.checklistBox}>
            {checklist.map((item) => (
              <div key={item} className={styles.task}>
                <span className={styles.taskBox}>
                  <input
                    type="checkbox"
                    checked={taskData.checkedTasks[item]}
                    onChange={(event) => handleTaskCheckbox(event, item)}
                  />
                  <input
                    className={styles.taskInput}
                    placeholder="Add a Task"
                    value={taskData.tasks[item]}
                    onChange={(event) => handleTaskChange(event, item)}
                  />
                </span>
                <img
                  src={deleteIcon}
                  alt="delete"
                  onClick={() => removeTask(item)}
                />
              </div>
            ))}
          </div>

          <button className={styles.addNew} onClick={addNewTask}>
            <img src={plusIcon} alt="Add New" className={styles.plusImg} />
            Add New
          </button>
        </div>

        <div className={styles.buttonContainer}>
          <Datepicker
            placeholderText="Select Due Date"
            selected={taskData.dueDate}
            onChange={(date) => selectDueDate(date)}
            className={styles.dateSelect}
            dateFormat="dd/MM/yyyy"
          />
          <span className={styles.buttons}>
            <button className={styles.cancel} onClick={cancelTask}>
              Cancel
            </button>
            <button className={styles.save} onClick={handleSubmit}>
              {taskDetails?._id ? "Save" : "Create"}
            </button>
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Task;
