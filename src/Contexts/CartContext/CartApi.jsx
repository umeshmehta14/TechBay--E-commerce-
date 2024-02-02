import axios from "axios";
import { API_URL } from "../../Utils/Constants";

export const getCartList = async (token) =>
  await axios.get(`${API_URL}/users/cart/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const postCartList = async ({ product, encodedToken }) =>
  await axios.post(
    "/api/user/cart",
    { product },
    {
      headers: {
        authorization: encodedToken,
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
