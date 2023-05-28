import React from "react";
import {
  AiFillStar,
  AiOutlineHeart,
  AiFillHeart,
  ImCart,
} from "../../../Icons/Icons";
import { useWishList } from "../../../Contexts/WishListContext/WishListContext";
import { useCart } from "../../../Contexts/CartContext/CartContext";
import { useAuth } from "../../../Contexts/AuthContext/AuthContext";
import "./WishlistCard.css";
import { useNavigate } from "react-router-dom";
import { increment } from "../../../DataReducer/Constants";

const WishlistCard = ({ item }) => {
  const { handleWishList, wishDisable } = useWishList();
  const { cartDisable, handleCartButton, handleCartQuantity } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const {
    _id,
    title,
    description,
    price,
    discountPercentage,
    original_price,
    rating,
    inWishlist,
    inCart,
    qty,
    image,
    trending,
  } = item;
  return (
    <div key={_id} className={`product-card product-card-wishlist`}>
      {token && inWishlist ? (
        <AiFillHeart
          className={`c-red wishList-icon ${wishDisable && "cursor-disable"}`}
          onClick={() => handleWishList(item)}
        />
      ) : (
        <AiOutlineHeart
          className={`wishList-icon ${wishDisable && "cursor-disable"}`}
          onClick={() => handleWishList(item)}
        />
      )}
      <div
        className="product-card-img product-card-img-wishlist"
        onClick={() => navigate(`/singleProduct/${_id}`)}
      >
        <img src={image} alt="Stay Tuned" />
        <span className={trending ? "trending" : ""}>
          {trending && "Trending"}
        </span>
      </div>
      <div className="disp-info-pc disp-info-pc-wishlist">
        <div
          className="product-card-info product-card-info-wishlist"
          onClick={() => navigate(`/singleProduct/${_id}`)}
        >
          <span className="rating">
            {rating}
            <AiFillStar />
          </span>
          <h3 className="product-title">{title}</h3>
          <p className="wishlist-description">{description}</p>
          <div className="price-box price-box-wishlist">
            <h3 className="discount">{discountPercentage}% off</h3>
            <p className="original-price">&#8377;{original_price}</p>
            <p className="price">&#8377;{price}</p>
          </div>
        </div>
        <div className="btn-box">
          <button
            disabled={cartDisable}
            className={`btn w-fit m-0 ${
              cartDisable || qty === +10 ? "cursor-disable" : ""
            } ${inCart ? "third-color" : ""}`}
            onClick={() =>
              inCart
                ? handleCartQuantity(increment, item)
                : handleCartButton(inCart, item)
            }
          >
            {inCart ? (
              `Added (${qty}) +`
            ) : (
              <>
                <ImCart /> Add to Cart
              </>
            )}
          </button>
          <button
            className={`btn btn-p-w  w-fit m-0 byn-btn${
              cartDisable ? "cursor-disable" : ""
            }`}
            onClick={() => handleCartButton(inCart, item, true)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
