import React from "react";
import { useAuth } from "../../../Contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LogOut.css";
export const LogOut = () => {
  const { logoutHandler, currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="logout-box">
      <h2>Your Profile</h2>
      <div className="logout-form d-flex">
        <p>
          <strong>Name:</strong>
          {currentUser?.firstName + " " + currentUser?.lastName}
        </p>
        <p>
          <strong>Email:</strong> {currentUser?.email}
        </p>
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
