import React, { useEffect } from "react";
import { useAuth } from "../../../Contexts/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import "./LogOut.css";
const LogOut = () => {
  const { token } = useAuth();
  const { logoutHandler, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate(location?.pathname?.from?.state || "/");
    }
  }, [token]);
  return (
      <div className="logout-box">
        <h2>Your Profile</h2>
        <div className="logout-form d-flex">
          <p><strong>
            Name:
            </strong> {currentUser?.firstName + " " + currentUser?.lastName}</p>
          <p> <strong>Email:</strong> {currentUser?.email}</p>
          <button
            className="btn"
            onClick={() => {
              logoutHandler();
              navigate("/login");
            }}
          >
            Log Out
          </button>
        </div>
      </div>
  );
};

export default LogOut;
