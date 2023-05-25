import React, {  useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "../../../Icons/Icons";
import "../Authentications.css";
import { useAuth } from "../../../Contexts/AuthContext/AuthContext";
import { useData } from "../../../Contexts/DataContext/DataContext";
import { setShowPassword } from "../../../DataReducer/Constants";
import { toast } from "react-toastify";

const Login = () => {
  const { loginHandler, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {state:{showPassword}, dispatch} = useData();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const guestEmail = "ishaanmehta782@gmail.com";
  const guestPassword = "password";
  const formHandler = (event) => {
    event.preventDefault();
    if(loginForm.password.length < 8){
      toast.warning("Password Have atleast 8 Characters",{containerId:"A", theme:"colored"});
    }
    else{
      loginHandler(loginForm.email, loginForm.password);
    }
  };

useEffect(() => {
  if (token) {
    navigate(location?.state?.from.pathname || "/", { replace: true });
  }
}, [token, navigate, location?.state?.from.pathname]);
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
                onClick={() => dispatch({type:setShowPassword})}
              />
            ) : (
              <AiOutlineEye
                className="eye-icon"
                title="Show"
                onClick={() => dispatch({type:setShowPassword})}
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
