import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";


export const users = [
  {
    _id: uuid(),
    firstName: "Umesh",
    lastName: "Mehta",
    email: "ishaanmehta782@gmail.com",
    password: "password",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
