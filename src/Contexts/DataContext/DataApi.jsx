import axios from "axios";
import { ApiUrl } from "../../Utils/Constants";

export const getAllProduct = async (
  page,
  includeOutStock,
  rating,
  price,
  trending,
  brand,
  category
) =>
  await axios.get(
    `${ApiUrl}/products/filter?page=${page}&limit=8&includeOutStock=${
      includeOutStock ? "1" : ""
    }&rating=${rating}&price=${price ? price : ""}&trending=${
      trending ? trending : ""
    }&category=${category?.join()}&brand=${brand?.join()}`
  );

export const getAllCategory = async () =>
  await axios.get(`${ApiUrl}/categories/`);

export const getBrands = async () =>
  await axios.get(`${ApiUrl}/products/brands`);
