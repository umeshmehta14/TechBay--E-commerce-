import React from "react";
import { useData } from "../../Contexts/DataContext/DataContext";
import "./Cart.css";
import {
  BsCartX,
  ImCart,
  AiFillHeart,
  AiOutlineHeart,
  RiDeleteBin5Line,
  AiFillStar,
} from "../../Icons/Icons";
import { useWishList } from "../../Contexts/WishListContext/WishListContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext/CartContext";
import { decrement, increment } from "../../DataReducer/Constants";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";

const Cart = () => {
  const {
    state: { products },
  } = useData();
  const { token } = useAuth();
  const { handleCart, cartDisable, handleCartQuantity } = useCart();
  const { handleWishList, wishDisable } = useWishList();
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
              <button className="btn" onClick={()=> navigate('/login',{ state: { from: location }})}>Login</button>
            </div>
          </div>
        ) : cartData.length > 0 ? (
          <h1>
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
        {token && <div className="cart-container">
          <div className="cart-details">
            { cartData.map((item) => {
              const {
                _id,
                title,
                price,
                discountPercentage,
                original_price,
                rating,
                inWishlist,
                inStock,
                qty,
                image,
                trending,
              } = item;
              return (
                <div key={_id} className="cart-product-card">
                  {inWishlist ? (
                    <AiFillHeart
                      className={`c-red wishList-icon ${
                        wishDisable ? "cursor-disable" : ""
                      }`}
                      onClick={() => handleWishList(item)}
                    />
                  ) : (
                    <AiOutlineHeart
                      className={`wishList-icon ${
                        wishDisable ? "cursor-disable" : ""
                      } ${!inStock ? "cursor-disable" : ""}`}
                      onClick={() => (inStock ? handleWishList(item) : null)}
                    />
                  )}
                  <div
                    className="cart-img"
                    onClick={() => navigate(`/singleProduct/${_id}`)}
                  >
                    <img src={image} alt="Stay Tuned" />
                    {inStock ? (
                      <span className={trending ? "trending" : ""}>
                        {trending && "Trending"}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="disp-info-pc cart-info">
                    <div
                      className="product-card-info cart-item-info"
                      onClick={() => navigate(`/singleProduct/${_id}`)}
                    >
                      <span className="rating">
                        {rating}
                        <AiFillStar />
                      </span>
                      <h3 className="product-title">{title}</h3>
                      <div className="price-box cart-price-details">
                        <h3 className="discount">{discountPercentage}% off</h3>
                        <p className="original-price">${original_price}</p>
                        <p className="price">${price}</p>
                      </div>
                    </div>

                    <div className="quantity-box">
                      <strong>Quantity:</strong>
                      <span className="cart-btn-box">
                        <button
                          className="quantity-btn br"
                          onClick={() => handleCartQuantity(increment, item)}
                        >
                          +
                        </button>
                        <span className="btn-para">{qty}</span>

                        <button
                          className="quantity-btn bl"
                          onClick={() => qty === 1 ? handleCart(item) : handleCartQuantity(decrement, item)}
                        >
                          -
                        </button>
                      </span>
                    </div>
                    <div className="remove-btn-box">
                      <button
                        className="remove-btn btn"
                        disabled={cartDisable}
                        onClick={() => handleCart(item)}
                      >
                        <span className="icon">
                          <RiDeleteBin5Line />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-price-box">
            {cartData.length > 0 ? (
              <>
                <h2>Price Details</h2>
                <h3>Total Delivery Time : min.</h3>

                <h3>Delivery Charge : $ 40</h3>
                <h3>Total Cost : $ </h3>
                <button disabled={{}} onClick={() => {}} className="btn coupon">
                  {"Coupon Applied"}
                </button>
                <button className="btn" onClick={() => {}}>
                  Place Order
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>}
      </div>
    </>
  );
};

export default Cart;
