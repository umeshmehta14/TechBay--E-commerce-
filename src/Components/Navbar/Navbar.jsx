import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import {
  FaShoppingBag,
  ImCart,
  RxCross1,
  GiHamburgerMenu,
  FaRegHeart,
  AiOutlineLogin,
  IoSearch,
  FaRegUserCircle,
  TbSearchOff,
} from "../../Utils/Icons/Icons";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { useData } from "../../Contexts/DataContext/DataContext";
import {
  setShowSearch,
  setShowBurger,
  setScreenWidth,
} from "../../Utils/Constants";
import SearchBox from "./Search-Box/SearchBox";

const Navbar = () => {
  const { token } = useAuth();
  const {
    state: { wishlist, cart, showBurger, showSearch, screenWidth },
    dispatch,
  } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const getStyle = ({ isActive }) => {
    return isActive ? { border: "1px solid white" } : {};
  };

  useEffect(() => {
    const handleResize = () => {
      dispatch({ type: setScreenWidth });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  if(location.pathname === "/404"){
    return null;
  }
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
                onClick={() => dispatch({ type: setShowSearch })}
                className="search-icon"
              >
                {showSearch ? <TbSearchOff /> : <IoSearch />}
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
              onClick={() => dispatch({ type: setShowBurger })}
            >
              {screenWidth > 768 ? (
                <li
                  onClick={() => dispatch({ type: setShowSearch })}
                  className="link-name"
                  id="f-search"
                  title="Search"
                >
                  {showSearch ? <TbSearchOff /> : <IoSearch />}
                </li>
              ) : (
                ""
              )}

              <li>
                <NavLink
                  style={getStyle}
                  className="link-name"
                  to="/products"
                  title="Products"
                >
                  <FaShoppingBag />
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={getStyle}
                  className="link-name"
                  to="/cart"
                  title="Cart"
                >
                  <ImCart />
                  {token && cart?.length > 0 && <span>{cart?.length}</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={getStyle}
                  className="link-name"
                  to="/wishlist"
                  title="WishList"
                >
                  <FaRegHeart />
                  {token && wishlist?.length > 0 && (
                    <span>{wishlist?.length}</span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={getStyle}
                  className="link-name"
                  to={token ? "/profile/logout" : "/login"}
                  title={token ? "Profile" : "Login"}
                >
                  {token ? <FaRegUserCircle /> : <AiOutlineLogin />}
                </NavLink>
              </li>
            </ul>

            <div
              className="hamburger-menu"
              onClick={() => dispatch({ type: setShowBurger })}
            >
              {showBurger ? (
                <RxCross1 className="hamburger-icon" />
              ) : (
                <GiHamburgerMenu className="hamburger-icon" />
              )}
            </div>
          </div>
        </div>
        <SearchBox/>
      </nav>
    </header>
  );
};

export default Navbar;
