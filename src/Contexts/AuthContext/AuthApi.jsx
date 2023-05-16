import axios from "axios";

export const getLoginInformation = async (email,password) => await axios.post('/api/auth/login', {
    email,
    password
});
export const createUser = async (name, lastName, email,password) => await axios.post('/api/auth/signup', {
    email,
    password,
    name,
    lastName
});