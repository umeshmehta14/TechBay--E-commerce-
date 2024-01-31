import axios from "axios";
import { ApiUrl } from "../../Utils/Constants";

export const getAllProduct = async (page) =>
  await axios.get(`${ApiUrl}/products/filter?page=${page}&limit=8`);

export const getAllCategory = async () =>
  await axios.get(`${ApiUrl}/categories/`);
