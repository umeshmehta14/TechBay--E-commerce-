import React from "react";
import { useNavigate } from "react-router-dom";

import "./WishlistCard.css";
import { useCart, useWishList } from "../../../Contexts";
import { AiFillStar, AiFillHeart, ImCart } from "../../../Utils/Icons/Icons";

const WishlistCard = ({ item }) => {
  const { removeProductFromWishList, wishDisable } = useWishList();
  const { cartDisable, handleCartButton } = useCart();
  const navigate = useNavigate();
  const {
    _id,
    title,
    description,
    price,
    discountPercentage,
    original_price,
    rating,
    inCart,
    image,
    trending,
  } = item;
  return (
    <div key={_id} className={`product-card product-card-wishlist`}>
      <AiFillHeart
        className={`c-red wishList-icon ${wishDisable && "cursor-disable"}`}
        onClick={() => removeProductFromWishList(_id, title)}
        title="Remove from wishlist"
      />
      <div
        className="product-card-img product-card-img-wishlist"
        onClick={() => navigate(`/product/${_id}`)}
      >
        <img src={image} alt="Stay Tuned" />
        <span className={trending ? "trending" : ""}>
          {trending && "Trending"}
        </span>
      </div>
      <section className="disp-info-pc disp-info-pc-wishlist">
        <div
          className="product-card-info product-card-info-wishlist"
          onClick={() => navigate(`/product/${_id}`)}
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
            className={`btn w-fit m-0 ${cartDisable ? "cursor-disable" : ""} ${
              inCart ? "third-color" : ""
            }`}
            onClick={() => handleCartButton(inCart, item)}
            title={inCart ? "go to cart" : "Add to cart"}
          >
            {inCart ? (
              "Go to Cart"
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
      </section>
    </div>
  );
};

export default WishlistCard;
