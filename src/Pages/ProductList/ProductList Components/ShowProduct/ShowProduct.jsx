import React from "react";
import {  AiFillStar, AiOutlineHeart, AiFillHeart } from "../../../../Icons/Icons";

import "./ShowProduct.css";
import { useNavigate } from "react-router-dom";

const ShowProduct = ({ item }) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    description,
    price,
    discountPercentage,
    original_price,
    rating,
    wished,
    inStock,
    image,
    trending,
  } = item;
  return (
    <>
      <div
        key={id}
        className={`product-card ${!inStock ? "stock-checker" : ""}`}
      >
        {wished ? <AiFillHeart className="wishList-icon bg-red"/>:<AiOutlineHeart className="wishList-icon" />}
        <div className="product-card-img" onClick={()=> navigate(`/singleProduct/${id}`)}>
          <img src={image} alt="Stay Tuned" width={"100px"} />
          {inStock ? (
            <span className={trending ? "trending":""}>
              {trending && "Trending"}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="disp-info-pc">
          <div className="product-card-info" onClick={()=> navigate(`/singleProduct/${id}`)}>
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
