import axios from 'axios';
import config from '../../config';

export const saveTask = async ({
  title,
  priority,
  assignedTo,
  queue,
  tasks,
  checkedTasks,
  checkedNumber,
  dueDate,
  user,
}) => {
  try {
    const reqUrl = `${config.backendUrl}/api/v1/task/add`;

    const response = await axios.post(reqUrl, {
      title,
      priority,
      assignedTo,
      queue,
      tasks,
      checkedTasks,
      checkedNumber,
      dueDate,
      user,
    });

    localStorage.setItem('isTaskCreated', response?.data?.isTaskCreated);
  } catch (error) {
    console.log(error);
  }
};

export const getTask = async (category, timeStamp, user) => {
  try {
    const reqUrl = `${config.backendUrl}/api/v1/task/getTask?category=${
      category || ''
    }&timeStamp=${timeStamp || ''}&createdBy=${user || ''}`;

    const response = await axios.get(reqUrl);
    let result = Array.from(response?.data?.data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateTaskQueueById = async (taskId, queue) => {
  try {
    const reqUrl = `${config.backendUrl}/api/v1/task/updateQueue?id=${
      taskId || ''
    }&queue=${queue || ''}`;

    const response = await axios.put(reqUrl);

    if (response?.data?.updated === true) {
      localStorage.setItem('queue', queue);
    }
    return response?.data?.updated;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTaskById = async (taskId) => {
  try {
    const reqUrl = `${config.backendUrl}/api/v1/task/getOne?id=${taskId || ''}`;

    const response = await axios.get(reqUrl);

    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const reqUrl = `${config.backendUrl}/api/v1/task/update?id=${id || ''}`;

    const response = await axios.put(reqUrl, taskData);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id) => {
  try {
    const reqUrl = `${config.backendUrl}/api/v1/task/delete?id=${id || ''}`;

    const response = await axios.delete(reqUrl);

    return response?.data?.isDeleted;
  } catch (error) {
    console.log(error);
  }
};

export const getDetails = async (user) => {
  try {
    const reqUrl = `${config.backendUrl}/api/v1/task/getAnalyticsDetails?user=${
      user || ''
    }`;

    const response = await axios.get(reqUrl);

    let result = response?.data?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (email) => {
  try {
    const reqUrl = `${config.backendUrl}/api/v1/task/addUser?email=${
      email || ''
    }`;

    const response = await axios.post(reqUrl);
    console.log(response);

    return response?.data?.isUserCreated;
  } catch (error) {
    console.log(error);
  }
};

export const getAssignee = async () => {
  try {
    const reqUrl = `${config.backendUrl}/api/v1/task/getAssignee`;

    const response = await axios.get(reqUrl);

    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
