import React from "react";
import { useData } from "../../Contexts/DataContext/DataContext";
import { useParams } from "react-router-dom";
import { AiFillStar, AiOutlineHeart } from "../../Icons/Icons";
import "./SingleProduct.css";

const SingleProduct = () => {
  const {
    state: { products },
  } = useData();
  const { productId } = useParams();
  const selectedProduct = products.find(({ _id }) => _id === productId);
  const {
    title,
    description,
    price,
    discountPercentage,
    original_price,
    category,
    brand,
    rating,
    inStock,
    image,
    trending,
  } = selectedProduct;
  return (
     <div className="container w-90 m-auto s-top-6">
      <div className="s-product-information-card">
      <AiOutlineHeart className="wishList-icon" />
        <div className="product-image-box">
            <img src={image} alt="Currently Not Available" />
            <span className={trending && "trending s-trending"}>
              {trending && "Trending"}
            </span>
          </div>
        <div className="s-product-details">
          <div className="s-product-info">
            <h1>{title}</h1>
            <span className="s-rating rating">
              {rating}
              <AiFillStar />
            </span>
            <h3 className="s-description"> <em> Description </em>: {description}</h3>
            <h4 className="s-description"> <em> Brand </em>: {brand}</h4>
            <h4 className="s-description"> <em> Category </em>: {category}</h4>
            {inStock && <p> <strong>Availability </strong> : In Stock</p>}
          </div>
          <div className="s-price-box price-box">
            <h3 className="s-discount discount">{discountPercentage}% off</h3>
            <p className="s-original-price original-price">${original_price}</p>
            <p className="s-price price">${price}</p>
          </div>
          <div className="s-btn-box">
            <button className="btn w-fit m-0">Add to Cart</button>
            <button className="btn w-fit m-0 s-byn-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
