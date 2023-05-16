import React, {  useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "../../../Icons/Icons";
import "../Authentications.css";
import { useAuth } from "../../../Contexts/AuthContext/AuthContext";

const Login = () => {
  const { loginHandler, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const guestEmail = "ishaanmehta782@gmail.com";
  const guestPassword = "password";
  const [showPassword, setShowPassword] = useState(false);
  const formHandler = (event) => {
    event.preventDefault();
    loginHandler(loginForm.email, loginForm.password);
    if(token)
    {
      navigate(location?.state?.from.pathname || '/');
    }
  };
0
  return (
    <div className="container main-login top-6">
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
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <AiOutlineEye
                className="eye-icon"
                title="Show"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <button
            type="submit"
            onClick={() =>
              setLoginForm({ email: guestEmail, password: guestPassword })
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
    </div>
  );
};

export default Login;
