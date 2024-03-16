import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getLoginInformation,
  createUser,
  userLogout,
  refreshUserToken,
  handleGoogleLogin,
} from "./AuthApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem("techbayUser"));
  const [userAuth, setUserAuth] = useState({
    token: localStorageToken?.token || "",
    currentUser: localStorageToken?.user || null,
  });

  const [authLoading, setAuthLoading] = useState(false);

  const { token, currentUser } = userAuth;

  const loginHandler = async (email, password) => {
    try {
      setAuthLoading(true);
      const {
        data: {
          statusCode,
          data: { user, refreshToken, accessToken },
        },
      } = await getLoginInformation(email, password);

      if (statusCode === 200) {
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
    } finally {
      setAuthLoading(false);
    }
  };

  const signUpHandler = async (username, email, password, confirmPassword) => {
    try {
      setAuthLoading(true);
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
    } finally {
      setAuthLoading(false);
    }
  };

  const logoutHandler = async () => {
    try {
      setAuthLoading(true);
      console.log("before logout");
      localStorage.removeItem("techbayUser");
      setUserAuth({ token: "", currentUser: null });
      await userLogout(token);

      console.log("logout running");
      toast.success(`Logout successful`, {
        containerId: "A",
        theme: "colored",
      });
    } catch (error) {
      console.error("logout ", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const refreshTokens = async () => {
    try {
      const {
        data: {
          statusCode,
          data: { accessToken, refreshToken, user },
        },
      } = await refreshUserToken(localStorageToken?.refreshToken);

      if (statusCode === 200) {
        setUserAuth({ token: accessToken, currentUser: user });
        localStorage.setItem(
          "techbayUser",
          JSON.stringify({
            token: accessToken,
            refreshToken,
            user,
          })
        );
      }
    } catch (error) {
      logoutHandler();
      toast.error(`Session Expired Login Again`, {
        containerId: "A",
        theme: "colored",
      });
      console.error(error);
    }
  };

  const googleLogin = async (codeResponse) => {
    setAuthLoading(true);
    try {
      const {
        data: {
          statusCode,
          data: { user, refreshToken, accessToken },
        },
      } = await handleGoogleLogin(codeResponse);
      if (statusCode === 200) {
        setUserAuth({ token: accessToken, currentUser: user });
        localStorage.setItem(
          "techbayUser",
          JSON.stringify({
            token: accessToken,
            refreshToken,
            user,
          })
        );
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
      console.error(error);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      refreshTokens();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginHandler,
        logoutHandler,
        googleLogin,
        signUpHandler,
        token,
        currentUser,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
