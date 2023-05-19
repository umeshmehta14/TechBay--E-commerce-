import React from "react";
import {
  AiFillStar,
  AiOutlineHeart,
  AiFillHeart,
  ImCart,
} from "../../../../Icons/Icons";

import "./ShowProduct.css";
import { useNavigate } from "react-router-dom";
import { useWishList } from "../../../../Contexts/WishListContext/WishListContext";
import { useCart } from "../../../../Contexts/CartContext/CartContext";

const ShowProduct = ({ item }) => {
  const { handleWishList, wishDisable } = useWishList();
  const { handleCart, cartDisable } = useCart();
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
    inStock,
    image,
    trending,
  } = item;
  return (
    <>
      <div
        key={_id}
        className={`product-card  ${!inStock ? "stock-checker cursor-disable" : ""}`}
        title={title}
      >
        {inWishlist ? (
          <AiFillHeart
            className={`c-red wishList-icon ${wishDisable && "cursor-disable"}`}
            onClick={() => handleWishList(item)}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            className={`wishList-icon ${wishDisable && "cursor-disable"} ${
              !inStock ? "cursor-disable" : ""
            }`}
            onClick={() => (inStock ? handleWishList(item) : null)}
            title="Add to wishlist"

          />
        )}
        <div
          className="product-card-img"
          onClick={() => inStock ? navigate(`/singleProduct/${_id}`) : null }
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
        <div className="disp-info-pc">
          <div
            className="product-card-info"
            onClick={() => navigate(`/singleProduct/${_id}`)}
          >
            <span className="rating">
              {rating}
              <AiFillStar />
            </span>
            <h3 className="product-title">{title}</h3>
            <p className="description">{description}</p>
            <div className="price-box">
              <h3 className="discount">{discountPercentage}% off</h3>
              <p className="original-price">${original_price}</p>
              <p className="price">${price}</p>
            </div>
          </div>
          <div className="btn-box">
            <button
            disabled={cartDisable}
              className="btn btn-p-w w-fit m-0"
              onClick={() => (inCart ? navigate("/cart") : handleCart(item))}
              title={inCart ? "go to cart" : "Add to cart"}
            >
              {inCart ? "Go to Cart" : <><ImCart /> Add to Cart</>}
            </button>
            <button className="btn btn-p-w  w-fit m-0 byn-btn" title="Buy Now">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowProduct;
