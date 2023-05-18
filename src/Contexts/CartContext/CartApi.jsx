import axios from "axios";

export const getCartList = async ({ encodedToken }) =>
  await axios.get("/api/user/cart", {
    headers: {
      authorization: encodedToken,
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

export const updateCartQuantity = async ({
  type,
  productId,
  encodedToken,
}) =>
   await axios.post(
    `/api/user/cart/${productId}`,
    {
      action: {type},
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
