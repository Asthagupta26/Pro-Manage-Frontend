/* eslint-disable no-undef */
import axios from 'axios';


export const registerUser = async (userDetails) => {
  const { name, email, password } = userDetails;

  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`; 

  try {
    const response = await axios.post(reqUrl, { name, email, password });

    if (response) {
      return response;
    } else {
      throw new Error('Registration failed: No email returned from server');
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginUser = async (userDetails) => {
  const { email, password } = userDetails;
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`;
    const response = await axios.post(reqUrl, { email, password });
    localStorage.setItem('proManageToken', response?.data?.token);
    localStorage.setItem('email', response?.data?.email);
    localStorage.setItem('name', response?.data?.name);
    let result;
    if (response?.data) {
      result = response;
    }
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updateUserName = async (email, name) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/update/name?email=${
      email || ''
    }&name=${name || ''}`;
    const response = await axios.put(reqUrl, { email, name });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUserDetails = async (email, userData) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/update/userDetails?email=${
      email || ''
    }`;
    const response = await axios.put(reqUrl, userData);
    if (response.data.updated === true) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
