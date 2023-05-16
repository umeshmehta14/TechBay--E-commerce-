import React from "react";
import {  AiFillStar, AiOutlineHeart, AiFillHeart } from "../../../../Icons/Icons";

import "./ShowProduct.css";
import { useNavigate } from "react-router-dom";
import { useWishList } from "../../../../Contexts/WishListContext/WishListContext";

const ShowProduct = ({ item }) => {
  const {handleWishList} = useWishList();
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
    inStock,
    image,
    trending,
  } = item;
  return (
    <>
      <div
        key={_id}
        className={`product-card ${!inStock ? "stock-checker" : ""}`}
      >
        {inWishlist ? <AiFillHeart className="c-red wishList-icon" onClick={()=> handleWishList(item)}/>:<AiOutlineHeart className="wishList-icon" onClick={()=> handleWishList(item)}/>}
        <div className="product-card-img" onClick={()=> navigate(`/singleProduct/${_id}`)}>
          <img src={image} alt="Stay Tuned" />
          {inStock ? (
            <span className={trending ? "trending":""}>
              {trending && "Trending"}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="disp-info-pc">
          <div className="product-card-info" onClick={()=> navigate(`/singleProduct/${_id}`)}>
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
            <button className="btn btn-p-w w-fit m-0">Add to Cart</button>
            <button className="btn btn-p-w  w-fit m-0 byn-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowProduct;
