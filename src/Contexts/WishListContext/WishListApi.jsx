import axios from "axios";
import { API_URL } from "../../Utils/Constants";

export const getWishList = async (accessToken) =>
  await axios.get(`${API_URL}/users/wishlist/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const addToWishList = async (productId, accessToken) =>
  await axios.patch(
    `${API_URL}/users/add/wishlist/${productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

export const removeWishlist = async (productId, accessToken) =>
  await axios.patch(
    `${API_URL}/users/remove/wishlist/${productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
