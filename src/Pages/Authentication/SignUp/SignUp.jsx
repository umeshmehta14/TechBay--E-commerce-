import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "../../../Icons/Icons";
import "../Authentications.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext/AuthContext";
const SignUp = () => {
  const { signUpHandler } = useAuth();
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const signupFormHandler = (event) => {
    event.preventDefault();
    signUpHandler(userDetail);
    navigate(location?.pathname?.from?.state || "/");
  };
  return (
    <div className="container main-login  top-6">
      <div className="auth-box main-signup">
        <h1>Sign Up</h1>
        <form
          action=""
          className="auth-form d-flex"
          onSubmit={() => signupFormHandler()}
        >
          <div className="detail-inp-box">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              className="email-inp"
              placeholder="Umesh"
              onChange={(event) =>
                setUserDetail({ ...userDetail, firstName: event.target.value })
              }
              required
            />
          </div>
          <div className="detail-inp-box">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              className="email-inp"
              placeholder="Mehta"
              onChange={(event) =>
                setUserDetail({ ...userDetail, lastName: event.target.value })
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
              autocomplete="current-password"
              required
            />
            {showSignUpPassword ? (
              <AiOutlineEyeInvisible
                className="eye-icon"
                title="Hide"
                onClick={() => setShowSignUpPassword(!showSignUpPassword)}
              />
            ) : (
              <AiOutlineEye
                className="eye-icon"
                title="Show"
                onClick={() => setShowSignUpPassword(!showSignUpPassword)}
              />
            )}
          </div>
          <button type="submit" className="btn">
            Create New Account
          </button>
          <p>
            Already have an account? <NavLink to="/login">Sign In</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;