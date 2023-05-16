import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import {
  FaShoppingBag,
  ImCart,
  RxCross1,
  GiHamburgerMenu,
  AiOutlineHeart,
  AiOutlineLogin,
  AiOutlineSearch,
  BiUserCircle
} from "../../Icons/Icons";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";

const Navbar = () => {
  const {token} = useAuth();
  const [showBurger, setShowBurger] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const getStyle = ({ isActive }) => {
    return isActive ? { border: "1px solid white" } : {};
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header>
      <nav className="navbar">
        <div className="nav-top-section">
          <div className="logo" onClick={() => navigate("/")}>
            TechBay
          </div>

          <div className="navbar-icons-section">
            {screenWidth < 768 ? (
              <div
                onClick={() => setShowSearch(!showSearch)}
                className="search-icon"
              >
                <AiOutlineSearch />
              </div>
            ) : (
              ""
            )}

            <ul
              className={"nav-links"}
              style={
                screenWidth < 768
                  ? {
                      height: showBurger ? "250px" : "0px",
                      transition: "height 0.7s ease",
                    }
                  : {}
              }
              onClick={() => setShowBurger(false)}
            >
              {screenWidth > 768 ? (
                <li
                  onClick={() => setShowSearch(!showSearch)}
                  className="link-name"
                  id="f-search"
                >
                  <AiOutlineSearch />
                </li>
              ) : (
                ""
              )}

              <li>
                <NavLink
                  style={getStyle}
                  className="link-name"
                  to="/products"
                  title="Product"
                >
                  <FaShoppingBag />
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={getStyle}
                  className="link-name"
                  to="/g"
                  title="Cart"
                >
                  <ImCart />
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={getStyle}
                  className="link-name"
                  to="/wishlist"
                  title="WishList"
                >
                  <AiOutlineHeart />
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={getStyle}
                  className="link-name"
                  to={token ? "/logout" : "/login"}
                  title={token ? "Profile" : "Login"}
                >
                  {token ? <BiUserCircle/> : <AiOutlineLogin />}
                </NavLink>
              </li>
            </ul>

            <div
              className="hamburger-menu"
              onClick={() => setShowBurger(!showBurger)}
            >
              {showBurger ? (
                <RxCross1 className="hamburger-icon" />
              ) : (
                <GiHamburgerMenu className="hamburger-icon" />
              )}
            </div>
          </div>
        </div>
        <div className={showSearch ? "search-input-box" : "disp-none"}>
          <label htmlFor="search">
            <AiOutlineSearch />
          </label>
          <input
            type="text"
            className="search-btn"
            id="search"
            placeholder="What are you looking for?"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
