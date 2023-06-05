import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import "./Profile.css";
import { useData } from "../../Contexts";
import {AddressForm} from "../../Components";

export const Profile = () => {
  const {
    state: { showAddressModal },
  } = useData();
  document.title = "Profile";

  return (
    <>
      <div className="container top-6-profile main-profile-container">
        <div className="profile-nav-box">
          <NavLink
            to="/profile/logout"
            className={({ isActive }) => (isActive ? "active-box" : "")}
          >
            Profile
          </NavLink>
          <NavLink
            to="/profile/addresses"
            className={({ isActive }) => (isActive ? "active-box" : "")}
          >
            Addresses
          </NavLink>
          <NavLink
            to="/profile/orderDetail"
            className={({ isActive }) => (isActive ? "active-box" : "")}
          >
            Orders
          </NavLink>
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
      {showAddressModal ? <AddressForm /> : ""}
    </>
  );
};
