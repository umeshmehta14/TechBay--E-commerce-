import axios from "axios";
import { API_URL } from "../../Utils/Constants";

export const getLoginInformation = async (email, password) =>
  await axios.post(`${API_URL}/users/login`, {
    email,
    password,
  });

export const createUser = async (username, email, password, confirmPassword) =>
  await axios.post(`${API_URL}/users/register`, {
    email,
    password,
    confirmPassword,
    username,
  });

export const userLogout = async (accessToken) =>
  await axios.get(`${API_URL}/users/logout`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
