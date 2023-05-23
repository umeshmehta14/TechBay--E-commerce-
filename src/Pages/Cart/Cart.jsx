import React from "react";
import { useData } from "../../Contexts/DataContext/DataContext";
import "./Cart.css";
import {
  BsCartX,
  ImCart,
} from "../../Icons/Icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import CartDetailCard from "./Cart Components/CartDetailCard";

const Cart = () => {
  const {
    state: { products, cart },
  } = useData();
  const { token } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const cartData = products.filter(({ inCart }) => inCart);
  const originalPrice = cart.reduce(
    (acc, { original_price, qty }) => (acc += original_price * qty),
    0
  );
  const totalCost =
    cart.reduce((acc, { price, qty }) => (acc += price * qty), 0);
  const discountedPrice = originalPrice - totalCost;
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
        {token ? (
          cart.length > 0 ? (
            <div className="cart-container">
              <div className="cart-details">
                {cartData.map((item) => <CartDetailCard key={item._id} item={item}/>)}
              </div>
              {cartData.length > 0 ? (
                <div className="cart-price-box">
                  <div className="price-heading">
                    <h3 className="pfc">Price Details</h3>
                  </div>
                  <div className="price-cost-section">
                    <p>
                      <span>Price ({cart.length} items)</span>{" "}
                      <span>&#8377;{originalPrice}</span>
                    </p>
                    <p>
                      <span>Discount</span>{" "}
                      <span className="green">-&#8377;{discountedPrice}</span>
                    </p>
                    <p>
                      <span>Delivery Charges</span> <span>&#8377;40</span>
                    </p>
                    <p>
                      <span>Secured Packaging Fee</span> <span>&#8377;29</span>{" "}
                    </p>
                  </div>
                  <div className="total-cost-heading">
                    <h3>
                      <span>Total Cost</span>
                      <span>&#8377;{totalCost + 79}</span>
                    </h3>
                  </div>

                  <div className="save-price-section">
                    <p className="green">
                      You will save &#8377;{discountedPrice} on this order
                    </p>
                  </div>
                  <button
                    className="btn"
                    onClick={() =>
                      navigate("/checkout", { state: { from: location } })
                    }
                  >
                    CHECKOUT
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Cart;
