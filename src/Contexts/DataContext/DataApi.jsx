import axios from "axios";
import { API_URL } from "../../Utils/Constants";

export const getAllProduct = async (
  page,
  includeOutStock,
  rating,
  price,
  trending,
  brand,
  category,
  arrangeType
) =>
  await axios.get(
    `${API_URL}/products/filter?page=${page}&limit=8&includeOutStock=${
      includeOutStock ? "1" : ""
    }&rating=${rating}&price=${price ? price : ""}&trending=${
      trending ? trending : ""
    }&category=${category?.join() || ""}&brand=${
      brand?.join() || ""
    }&arrangeType=${arrangeType || ""}`
  );

export const getAllCategory = async () =>
  await axios.get(`${API_URL}/categories/`);

export const getBrands = async () =>
  await axios.get(`${API_URL}/products/brands`);

export const searchProducts = async (searchValue) =>
  axios.get(`${API_URL}/products/search/${searchValue}`);
