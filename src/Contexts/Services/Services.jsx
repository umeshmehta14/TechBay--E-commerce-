import axios from "axios";
export const getAllProduct = async() => await axios.get("/api/products");
export const getAllCategory = async() => await axios.get("/api/categories");


