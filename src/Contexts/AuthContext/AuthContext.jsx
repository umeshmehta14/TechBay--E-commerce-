import { createContext, useContext, useState } from "react";
import { getLoginInformation, createUser } from "./AuthApi";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem("loginDetails"));
  const [token, setToken] = useState(localStorageToken?.token);
  const [currentUser, setCurrentUser] = useState(localStorageToken?.user);

  const loginHandler = async (email, password) => {
    try {
      const {
        status,
        data: { foundUser, encodedToken },
      } = await getLoginInformation(email, password);
      if (status === 200 || status === 201) {
        localStorage.setItem(
          "loginDetails",
          JSON.stringify({ user: foundUser, token: encodedToken })
        );
        setCurrentUser(foundUser);
        setToken(encodedToken);
        toast.success(`Welcome Back ${foundUser.firstName} To TechBay`, { containerId: 'A', theme: "colored" });
      }
    } catch (err) {
      toast.error(`Invalid Credentials`, { containerId: 'A', theme: "colored" });
    }
  };

  const signUpHandler = async (firstName, lastName, email, password) => {
    try {
      const {
        status,
        data: { createdUser, encodedToken },
      } = await createUser(firstName, lastName, email, password);
       
      if (status === 201 || status === 200) {
        localStorage.setItem(
          "loginDetails",
          JSON.stringify({ token: encodedToken, user: createdUser })
        );
        setCurrentUser(createdUser);
        setToken(encodedToken);
        toast.success(`Welcome ${createdUser.firstName} To TechBay`, { containerId: 'A', theme: "colored" });
      }
    } catch (err) {
        toast.error(`Email Already Exist`, { containerId: 'A', theme: "colored" });
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("loginDetails");
    setToken(null);
    setCurrentUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ loginHandler, logoutHandler, token, signUpHandler, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
