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

export const deleteCartList = async ({ productId, encodedToken }) =>
  await axios.delete(`/api/user/cart/${productId}`, {
    headers: {
      authorization: encodedToken,
    },
  });

export const updateCartQuantity = async ({ type, productId, encodedToken }) =>
  await axios.post(
    `/api/user/cart/${productId}`,
    {
      action: { type },
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
