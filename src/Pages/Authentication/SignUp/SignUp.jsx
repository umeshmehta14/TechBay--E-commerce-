import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import "../Authentications.css";
import { useData, useAuth } from "../../../Contexts";
import { SET_SHOW_SIGNUP_PASSWORD } from "../../../Utils/Constants";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "../../../Utils/Icons/Icons";

export const SignUp = () => {
  const { signUpHandler, token } = useAuth();
  const {
    state: { showSignUpPassword },
    dispatch,
  } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const { email, password, confirmPassword, username } = userDetail;

  document.title = "SignUp";

  const signupFormHandler = (event) => {
    event.preventDefault();

    signUpHandler(username, email, password, confirmPassword);
  };
  useEffect(() => {
    if (token) {
      navigate(location?.pathname?.from?.state || "/");
    }
  }, [token, location?.pathname?.from?.state]);

  return (
    <main className="container main-login  top-6">
      <div className="auth-box main-signup">
        <h1>Sign Up</h1>
        <form
          action=""
          className="auth-form d-flex"
          onSubmit={signupFormHandler}
        >
          <div className="detail-inp-box">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="email-inp"
              placeholder="Umesh mehta"
              onChange={(event) =>
                setUserDetail({ ...userDetail, username: event.target.value })
              }
              required
            />
          </div>
          <div className="detail-inp-box">
            <label htmlFor="email-address">Email Address</label>
            <input
              type="email"
              id="email-address"
              className="email-inp"
              placeholder="techiTechBay@.com"
              onChange={(event) =>
                setUserDetail({ ...userDetail, email: event.target.value })
              }
              required
            />
          </div>
          <div className="detail-inp-box">
            <label htmlFor="password">Password</label>
            <input
              type={showSignUpPassword ? "text" : "password"}
              id="password"
              className="password-inp"
              placeholder="1234098"
              onChange={(event) =>
                setUserDetail({ ...userDetail, password: event.target.value })
              }
              autoComplete="current-password"
              required
            />
            {password?.length === 0 ? null : showSignUpPassword ? (
              <AiOutlineEyeInvisible
                className="eye-icon"
                title="Hide"
                onClick={() => dispatch({ type: SET_SHOW_SIGNUP_PASSWORD })}
              />
            ) : (
              <AiOutlineEye
                className="eye-icon"
                title="Show"
                onClick={() => dispatch({ type: SET_SHOW_SIGNUP_PASSWORD })}
              />
            )}
          </div>
          <div className="detail-inp-box">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              id="cpassword"
              className="password-inp"
              placeholder="1234098"
              onChange={(event) =>
                setUserDetail({
                  ...userDetail,
                  confirmPassword: event.target.value,
                })
              }
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" className="btn">
            Create New Account
          </button>
          <p>
            Already have an account? <NavLink to="/login">Sign In</NavLink>
          </p>
        </form>
      </div>
    </main>
  );
};
