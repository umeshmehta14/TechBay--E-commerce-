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
    state: { products, cart },
  } = useData();
  const { token } = useAuth();
  const { handleCart, cartDisable, handleCartQuantity } = useCart();
  const { handleWishList, wishDisable } = useWishList();
  const navigate = useNavigate();
  const location = useLocation();
  const cartData = products.filter(({ inCart }) => inCart);
  const originalPrice = cart.reduce(
    (acc, { original_price, qty }) => (acc += original_price * qty),
    0
  );
  const totalCost =
    cart.reduce((acc, { price, qty }) => (acc += price * qty), 0) + 79;
  const discountedPrice = totalCost < originalPrice ? originalPrice - totalCost : (originalPrice + 50) - originalPrice ;
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
        {token ?  cart.length > 0 ?(
          <div className="cart-container">
             <div className="cart-details">
              {cartData.map((item) => {
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
                  <div key={_id} className="cart-product-card" title={title}>
                    {inWishlist ? (
                      <AiFillHeart
                        className={`c-red wishList-icon ${
                          wishDisable ? "cursor-disable" : ""
                        }`}
                        onClick={() => handleWishList(item)}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        className={`wishList-icon ${
                          wishDisable ? "cursor-disable" : ""
                        } ${!inStock ? "cursor-disable" : ""}`}
                        onClick={() => (inStock ? handleWishList(item) : null)}
                        title="Add to wishlist"
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
                          <h3 className="discount">
                            {discountPercentage}% off
                          </h3>
                          <p className="original-price">&#8377;{original_price}</p>
                          <p className="price">&#8377;{price}</p>
                        </div>
                      </div>

                      <div className="quantity-box">
                        <strong>Quantity:</strong>
                        <span className="cart-btn-box">
                          <button
                            className={`quantity-btn br ${
                              qty === 1 ? "cursor-disable" : ""
                            }`}
                            disabled={qty === 1}
                            onClick={() => handleCartQuantity(decrement, item)}
                          >
                            -
                          </button>

                          <span className="btn-para">{qty}</span>

                          <button
                          disabled={cartDisable}
                            className="quantity-btn bl"
                            onClick={() => handleCartQuantity(increment, item)}
                          >
                            +
                          </button>
                        </span>
                      </div>
                      <div className="remove-btn-box">
                        <button
                          className="remove-btn btn"
                          disabled={cartDisable}
                          onClick={() => handleCart(item)}
                        >
                          <span className="icon" title="Remove from Cart">
                            <RiDeleteBin5Line />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                    <span>Discount</span> <span className="green">&#8377;{discountedPrice}</span>
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
                    <span>&#8377;{totalCost}</span>
                  </h3>
                </div>

                <div className="save-price-section">
                  <p className="green">You will save &#8377;{discountedPrice} on this order</p>
                </div>
                <button className="btn" onClick={() => navigate('/checkout',{state:{from:location}})}>
                  CHECKOUT
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        ):"":""}
      </div>
    </>
  );
};

export default Cart;
