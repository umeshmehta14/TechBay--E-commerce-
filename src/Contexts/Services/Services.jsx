import axios from "axios";
export const getAllProduct = async() => await axios.get("/api/products");