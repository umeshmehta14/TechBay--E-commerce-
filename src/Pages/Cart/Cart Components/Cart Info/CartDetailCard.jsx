import React from "react";
import { useNavigate } from "react-router-dom";

import "./CartDetailCard.css";
import { useCart, useWishList } from "../../../../Contexts";
import { decrement, increment } from "../../../../Utils/Constants";
import {
  AiFillHeart,
  AiOutlineHeart,
  RiDeleteBin5Line,
  AiFillStar,
} from "../../../../Utils/Icons/Icons";

const CartDetailCard = ({ item }) => {
  const { handleCart, cartDisable, handleCartQuantity } = useCart();
  const { handleWishList, wishDisable } = useWishList();

  const navigate = useNavigate();
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
          className={`wishList-icon ${wishDisable ? "cursor-disable" : ""} ${
            !inStock ? "cursor-disable" : ""
          }`}
          onClick={() => (inStock ? handleWishList(item) : null)}
          title="Add to wishlist"
        />
      )}
      <section
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
      </section>

      <section className="disp-info-pc cart-info">
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
            <p className="original-price">&#8377;{original_price}</p>
            <p className="price">&#8377;{price}</p>
          </div>
        </div>

        <div className="quantity-box">
          <strong>Quantity:</strong>
          <span className="cart-btn-box">
            <button
              className={`quantity-btn br ${
                qty === +1 || cartDisable ? "cursor-disable" : ""
              }`}
              disabled={cartDisable || qty === +1}
              onClick={() => handleCartQuantity(decrement, item)}
            >
              -
            </button>

            <span className="btn-para">{qty}</span>

            <button
              disabled={cartDisable}
              className={`quantity-btn bl ${
                qty === +10 || cartDisable ? "cursor-disable" : ""
              }`}
              onClick={() => handleCartQuantity(increment, item)}
            >
              +
            </button>
          </span>
        </div>
        <section className="remove-btn-box">
          <button
            className={`remove-btn btn ${cartDisable ? "cursor-disable" : ""}`}
            disabled={cartDisable}
            title="Remove from Cart"
            onClick={() => handleCart(item)}
          >
            <span className="icon" >
              <RiDeleteBin5Line />
            </span>
          </button>
        </section>
      </section>
    </div>
  );
};

export default CartDetailCard;
