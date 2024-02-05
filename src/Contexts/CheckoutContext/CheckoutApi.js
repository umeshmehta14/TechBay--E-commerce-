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

export const removeUserAddress = async (token, addressId) =>
  await axios.delete(`${API_URL}/address/${addressId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateUserAddress = async (token, address) =>
  await axios.patch(
    `${API_URL}/address/${address?._id}`,
    { ...address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getUserOrders = async (token) =>
  await axios.get(`${API_URL}/order`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addUserOrder = async (token, order) =>
  await axios.post(
    `${API_URL}/order`,
    { ...order },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const deleteUserOrder = async (token, orderId) =>
  await axios.post(`${API_URL}/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
