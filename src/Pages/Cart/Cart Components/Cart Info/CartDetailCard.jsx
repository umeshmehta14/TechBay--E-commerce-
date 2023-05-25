import React from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  RiDeleteBin5Line,
  AiFillStar,
} from "../../../../Icons/Icons";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../../Contexts/CartContext/CartContext";
import { useWishList } from "../../../../Contexts/WishListContext/WishListContext";
import "./CartDetailCard.css";
import { decrement, increment } from "../../../../DataReducer/Constants";

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
            <p className="original-price">&#8377;{original_price}</p>
            <p className="price">&#8377;{price}</p>
          </div>
        </div>

        <div className="quantity-box">
          <strong>Quantity:</strong>
          <span className="cart-btn-box">
            <button
              className={`quantity-btn br ${qty === +1 ? "cursor-disable" : ""}`}
              disabled={cartDisable || qty === +1}
              onClick={() => handleCartQuantity(decrement, item)}
            >
              -
            </button>

            <span className="btn-para">{qty}</span>

            <button
              disabled={cartDisable || qty === +10}
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
};

export default CartDetailCard;
