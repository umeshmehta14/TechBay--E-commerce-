import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "../../../Utils/Icons/Icons";
import "../Authentications.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext/AuthContext";
import { useData } from "../../../Contexts/DataContext/DataContext";
import { setShowSignUpPassword } from "../../../Utils/Constants";
import { toast } from "react-toastify";

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
    cPassword: "",
    firstName: "",
    lastName: "",
  });
  document.title = "SignUp";

  const signupFormHandler = (event) => {
    event.preventDefault();
    if (userDetail.password === userDetail.cPassword) {
      if (userDetail.password.length < 8) {
        toast.warning("Password Have Atleast 8 Characters", {
          containerId: "A",
          theme: "colored",
        });
      } else {
        signUpHandler(
          userDetail.firstName,
          userDetail.lastName,
          userDetail.email,
          userDetail.password
        );
      }
    } else {
      toast.error("Password Does'nt Match", {
        containerId: "A",
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    if (token) {
      navigate(location?.pathname?.from?.state || "/");
    }
  }, [token, location?.pathname?.from?.state]);
  return (
    <div className="container main-login  top-6">
      <div className="auth-box main-signup">
        <h1>Sign Up</h1>
        <form
          action=""
          className="auth-form d-flex"
          onSubmit={signupFormHandler}
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
              autoComplete="current-password"
              required
            />
            {showSignUpPassword ? (
              <AiOutlineEyeInvisible
                className="eye-icon"
                title="Hide"
                onClick={() => dispatch({ type: setShowSignUpPassword })}
              />
            ) : (
              <AiOutlineEye
                className="eye-icon"
                title="Show"
                onClick={() => dispatch({ type: setShowSignUpPassword })}
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
                setUserDetail({ ...userDetail, cPassword: event.target.value })
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
    </div>
  );
};

