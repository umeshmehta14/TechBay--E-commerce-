import axios from "axios";
import { API_URL } from "../../Utils/Constants";

export const getAddress = async (token) =>
  await axios.get(`${API_URL}/address/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addUserAddress = async (token, address) =>
  await axios.post(
    `${API_URL}/address/`,
    { ...address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
// export const addUserAddress = async (token, address) =>
//   await axios.post(
//     `http://localhost:8000/api/v1/address/`,
//     { ...address },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
