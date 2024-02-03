import axios from "axios";
import { API_URL } from "../../Utils/Constants";

export const getCartList = async (token) =>
  await axios.get(`${API_URL}/users/cart/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addCartList = async (productId, token) =>
  await axios.patch(
    `${API_URL}/users/add/cart/${productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const removeCartList = async (productId, token) =>
  await axios.patch(
    `${API_URL}/users/remove/cart/${productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const updateCartQuantity = async (productId, quantity, token) =>
  await axios.patch(
    `${API_URL}/users/update-quantity/cart/${quantity}/${productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
