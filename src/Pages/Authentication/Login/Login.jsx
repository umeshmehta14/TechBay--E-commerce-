import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../Authentications.css";
import { useData, useAuth } from "../../../Contexts";
import { GUEST_DATA, setShowPassword } from "../../../Utils/Constants";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "../../../Utils/Icons/Icons";

export const Login = () => {
  const { loginHandler, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { showPassword },
    dispatch,
  } = useData();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  document.title = "Login";

  const formHandler = (event) => {
    event.preventDefault();
    loginHandler(loginForm.email, loginForm.password);
  };

  useEffect(() => {
    if (token) {
      navigate(location?.state?.from.pathname || "/", { replace: true });
    }
  }, [token, navigate, location?.state?.from.pathname]);
  return (
    <main className="container main-login top-6">
      <div className="auth-box">
        <h1>Sign In</h1>
        <form action="" className="auth-form d-flex" onSubmit={formHandler}>
          <div className="detail-inp-box">
            <label htmlFor="email-address">Email Address</label>
            <input
              type="email"
              id="email-address"
              className="email-inp"
              placeholder="techiTechBay@.com"
              value={loginForm.email}
              required
              onChange={(event) =>
                setLoginForm({ ...loginForm, email: event.target.value })
              }
            />
          </div>
          <div className="detail-inp-box">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="password-inp"
              placeholder="1234098"
              value={loginForm.password}
              required
              onChange={(event) =>
                setLoginForm({ ...loginForm, password: event.target.value })
              }
            />

            {showPassword ? (
              <AiOutlineEyeInvisible
                className="eye-icon"
                title="Hide"
                onClick={() => dispatch({ type: setShowPassword })}
              />
            ) : (
              <AiOutlineEye
                className="eye-icon"
                title="Show"
                onClick={() => dispatch({ type: setShowPassword })}
              />
            )}
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <button
            type="submit"
            onClick={() =>
              setLoginForm({
                email: GUEST_DATA.email,
                password: GUEST_DATA.password,
              })
            }
            className="btn"
          >
            Login as Guest
          </button>
          <p>
            Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
          </p>
        </form>
      </div>
    </main>
  );
};
