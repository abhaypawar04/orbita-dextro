import axios from "axios";

const API_URL = "http://localhost:5000/api";

// @desc
// get all users
export const getUsers = () => {
  return axios.get(`${API_URL}/users`);
};

//@desc
//get one user
export const getUser = (id) => {
  return axios.get(`${API_URL}/users/${id}`);
};

//@desc
//create a user
export const createUser = (user) => {
  return axios.post(`${API_URL}/users`, user);
};

//@desc
//update a user
export const updateUser = (id, user) => {
  return axios.put(`${API_URL}/users/${id}`, user);
};

//@desc
//delete a user
export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/users/${id}`);
};
