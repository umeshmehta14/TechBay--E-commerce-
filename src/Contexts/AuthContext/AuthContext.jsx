import { createContext, useContext, useState } from "react";
import { getLoginInformation, createUser } from "./AuthApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem('loginDetails'));
  const [token, setToken] = useState(localStorageToken?.token);
  const [currentUser, setCurrentUser] = useState(localStorageToken?.user);


  const loginHandler = async (email, password) => {
    try {
      const {status , data:{foundUser, encodedToken}} = await getLoginInformation(email, password);
      if(status === 200 || status === 201)
      {
        localStorage.setItem("loginDetails", JSON.stringify({user: foundUser, token: encodedToken}));
        setCurrentUser(foundUser);
        setToken(encodedToken);
      }
      // successfully logged in
    } catch (err) {
      console.error(err);
    }
  };

  const signUpHandler = async ({name, lastName, email, password})=>{
    try {
      const {status, data:{createdUser, encodedToken}} = await createUser(name, lastName, email, password);
      if(status === 201 || status === 200)
      {
        setCurrentUser(createdUser);
        setToken(encodedToken)
      }
    } catch (err) {
      if(err.status === 422)
      {
        console.error("User already exists");
      }
      console.error(err);
    }
  }


  const logoutHandler = () => {
    localStorage.removeItem('loginDetails');
    setToken(null);
    setCurrentUser(null);
  };
  return (
    <AuthContext.Provider value={{ loginHandler, logoutHandler, token,signUpHandler, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = ()=> useContext(AuthContext);