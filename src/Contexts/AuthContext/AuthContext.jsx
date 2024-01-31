import { createContext, useContext, useState } from "react";
import { getLoginInformation, createUser, userLogout } from "./AuthApi";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem("techbayUser"));
  const [userAuth, setUserAuth] = useState({
    token: localStorageToken?.token || "",
    currentUser: localStorageToken?.user || null,
  });

  const { token, currentUser } = userAuth;

  const loginHandler = async (email, password) => {
    try {
      const {
        data: {
          statusCode,
          data: { user, refreshToken, accessToken },
        },
      } = await getLoginInformation(email, password);

      if (statusCode === 200) {
        console.log("user logged in", user);
        localStorage.setItem(
          "techbayUser",
          JSON.stringify({ user, token: accessToken, refreshToken })
        );
        setUserAuth({ token: accessToken, currentUser: user });
        toast.success(`Welcome Back ${user.username} To TechBay`, {
          containerId: "A",
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(`${error.response.data.error}`, {
        containerId: "A",
        theme: "colored",
      });
    }
  };

  const signUpHandler = async (username, email, password, confirmPassword) => {
    try {
      const {
        data: {
          statusCode,
          data: { createdUser, refreshToken, accessToken },
        },
      } = await createUser(username, email, password, confirmPassword);

      if (statusCode === 201) {
        localStorage.setItem(
          "techbayUser",
          JSON.stringify({
            token: accessToken,
            refreshToken,
            user: createdUser,
          })
        );
        setUserAuth({ token: accessToken, currentUser: createdUser });

        toast.success(`Welcome ${createdUser.username} To TechBay`, {
          containerId: "A",
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Internal server Error, try after sometime", {
        containerId: "A",
        theme: "colored",
      });
    }
  };

  const logoutHandler = async () => {
    try {
      await userLogout(token);
      localStorage.removeItem("techbayUser");
      setUserAuth({ token: "", currentUser: null });
      toast.success(`Logout successful`, {
        containerId: "A",
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
    }
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
