import axios from "axios";
import { API_URL } from "../../Utils/Constants";

export const getAddress = async (token) =>
  await axios.get(`${API_URL}/address/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addAddress = async (token) =>
  await axios.post(
    `${API_URL}/address/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
