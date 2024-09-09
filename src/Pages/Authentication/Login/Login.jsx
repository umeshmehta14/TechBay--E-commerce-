import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import google_logo from "../../../Utils/Images/google_logo.png";

import "../Authentications.css";
import { useData, useAuth } from "../../../Contexts";
import { SET_SHOW_PASSWORD } from "../../../Utils/Constants";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "../../../Utils/Icons/Icons";

export const Login = () => {
  const { loginHandler, token, googleLogin } = useAuth();
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

  const { email, password } = loginForm;

  document.title = "Techbay | Login";

  const formHandler = (event) => {
    event.preventDefault();
    loginHandler(email, password);
  };

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => googleLogin(codeResponse),
  });

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
              value={email}
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
              value={password}
              required
              onChange={(event) =>
                setLoginForm({ ...loginForm, password: event.target.value })
              }
            />

            {password?.length === 0 ? null : showPassword ? (
              <AiOutlineEyeInvisible
                className="eye-icon"
                title="Hide"
                onClick={() => dispatch({ type: SET_SHOW_PASSWORD })}
              />
            ) : (
              <AiOutlineEye
                className="eye-icon"
                title="Show"
                onClick={() => dispatch({ type: SET_SHOW_PASSWORD })}
              />
            )}
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <button type="button" className="btn google-btn" onClick={login}>
            Sign in with Google <img src={google_logo} alt="🚀" />
          </button>
          <p>
            Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
          </p>
        </form>
      </div>
    </main>
  );
};
