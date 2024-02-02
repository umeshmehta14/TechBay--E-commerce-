import React from "react";
import { useNavigate } from "react-router-dom";

import "./CartDetailCard.css";
import { useCart, useData, useWishList } from "../../../../Contexts";
import { DECREMENT, INCREMENT } from "../../../../Utils/Constants";
import {
  AiFillHeart,
  AiOutlineHeart,
  RiDeleteBin5Line,
  AiFillStar,
} from "../../../../Utils/Icons/Icons";

const CartDetailCard = ({ item }) => {
  const { removeProductFromCart, cartDisable, handleCartQuantity } = useCart();
  const { removeProductFromWishList, addProductToWishList, wishDisable } =
    useWishList();

  const {
    state: { wishlist },
  } = useData();

  const navigate = useNavigate();
  const {
    product: {
      _id,
      title,
      price,
      discountPercentage,
      original_price,
      rating,
      inStock,
      image,
      trending,
    },
    quantity,
  } = item;

  const inWishlist = wishlist?.find((elem) => elem._id === _id);

  return (
    <div key={_id} className="cart-product-card" title={title}>
      {inWishlist ? (
        <AiFillHeart
          className={`c-red wishList-icon ${wishDisable && "cursor-disable"}`}
          onClick={() => removeProductFromWishList(_id, title)}
          title="Remove from wishlist"
        />
      ) : (
        <AiOutlineHeart
          className={`wishList-icon ${wishDisable && "cursor-disable"} ${
            !inStock ? "cursor-disable" : ""
          }`}
          onClick={() => addProductToWishList(_id)}
          title="Add to wishlist"
        />
      )}
      <section className="cart-img" onClick={() => navigate(`/product/${_id}`)}>
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
          onClick={() => navigate(`/product/${_id}`)}
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
                quantity === +1 || cartDisable ? "cursor-disable" : ""
              }`}
              disabled={cartDisable || quantity === +1}
              onClick={() => handleCartQuantity(_id, DECREMENT, quantity)}
            >
              -
            </button>

            <span className="btn-para">{quantity}</span>

            <button
              disabled={cartDisable}
              className={`quantity-btn bl ${
                quantity === +10 || cartDisable ? "cursor-disable" : ""
              }`}
              onClick={() => handleCartQuantity(_id, INCREMENT, quantity)}
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
            // onClick={() => handleCart(item)}
            onClick={() => removeProductFromCart(_id, title)}
          >
            <span className="icon">
              <RiDeleteBin5Line />
            </span>
          </button>
        </section>
      </section>
    </div>
  );
};

export default CartDetailCard;
