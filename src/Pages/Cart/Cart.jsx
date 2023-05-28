import React from "react";
import { useData } from "../../Contexts/DataContext/DataContext";
import "./Cart.css";
import {
  BsCartX,
  ImCart,
} from "../../Icons/Icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import CartDetailCard from "./Cart Components/Cart Info/CartDetailCard";
import CartPrice from "./Cart Components/Cart Price/CartPrice";

const Cart = () => {
  const {
    state: { products }
  } = useData();
  const { token } = useAuth();
  document.title = "Cart";

  const navigate = useNavigate();
  const location = useLocation();
  const cartData = products.filter(({ inCart }) => inCart);

  return (
    <>
      <div className="container cart-top-6">
        {!token ? (
          <div className="unlog-cart">
            <img
              src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
              alt="Missing Cart"
            />
            <div className="cart-login-info">
              <h2>Missing Cart items?</h2>
              <h3>Login to see the items you added previously</h3>
              <button
                className="btn"
                onClick={() =>
                  navigate("/login", { state: { from: location } })
                }
              >
                Login
              </button>
            </div>
          </div>
        ) : cartData.length > 0 ? (
          <h1 className="cart-heading">
            Cart{" "}
            <span className="icon">
              <ImCart />
            </span>
          </h1>
        ) : (
          <>
            <div className="cart-page-logo">
              <BsCartX />
            </div>
            <h1 className="cart-heading">Your cart is currently empty.</h1>
          </>
        )}
        {token && (
          cartData.length > 0 ? (
            <div className="cart-container">
              <div className="cart-details">
                {cartData.map((item) => <CartDetailCard key={item._id} item={item}/>)}
              </div>
              {cartData.length > 0 ? (
                <CartPrice/>
              ) : (
                null
              )}
            </div>
          ) : (
            null
          )
        )}
      </div>
    </>
  );
};

export default Cart;
