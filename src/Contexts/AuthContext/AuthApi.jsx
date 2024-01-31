import axios from "axios";
import { ApiUrl } from "../../Utils/Constants";

export const getLoginInformation = async (email, password) =>
  await axios.post(`${ApiUrl}/users/login`, {
    email,
    password,
  });

export const createUser = async (username, email, password, confirmPassword) =>
  await axios.post(`${ApiUrl}/users/register`, {
    email,
    password,
    confirmPassword,
    username,
  });

export const userLogout = async (accessToken) =>
  await axios.get(`${ApiUrl}/users/logout`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
