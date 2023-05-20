import React, { useEffect } from "react";
import { useData } from "../../Contexts/DataContext/DataContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AiFillStar,
  AiOutlineHeart,
  AiFillHeart,
  ImCart,
} from "../../Icons/Icons";
import "./SingleProduct.css";
import { useWishList } from "../../Contexts/WishListContext/WishListContext";
import { useCart } from "../../Contexts/CartContext/CartContext";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";

const SingleProduct = () => {
  const {
    state: { products }
  } = useData();
  const { wishDisable, handleWishList } = useWishList();
  const { handleCart } = useCart();
  const { productId } = useParams();
  const {token} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
    inWishlist,
    inCart,
    image,
    trending,
  } = selectedProduct;
  return (
    <div className="container w-90 m-auto s-top-6">
      <div className="s-product-information-card" title={title}>
        {inWishlist ? (
          <AiFillHeart
            className={`c-red wishList-icon ${
              wishDisable ? "cursor-disable" : ""
            }`}
            onClick={() => handleWishList(selectedProduct)}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            className={`wishList-icon ${wishDisable ? "cursor-disable" : ""} ${
              !inStock ? "cursor-disable" : ""
            }`}
            onClick={() => (inStock ? handleWishList(selectedProduct) : null)}
            title="Add to wishlist"

          />
        )}
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
            <h3 className="s-description">
              {" "}
              <em> Description </em>: {description}
            </h3>
            <h4 className="s-description">
              {" "}
              <em> Brand </em>: {brand}
            </h4>
            <h4 className="s-description">
              {" "}
              <em> Category </em>: {category}
            </h4>
            {inStock && (
              <p>
                {" "}
                <strong>Availability </strong> : In Stock
              </p>
            )}
          </div>
          <div className="s-price-box price-box">
            <h3 className="s-discount discount">{discountPercentage}% off</h3>
            <p className="s-original-price original-price">${original_price}</p>
            <p className="s-price price">${price}</p>
          </div>
          <div className="s-btn-box">
            <button
              className="btn w-fit m-0"
              onClick={() => !token ? navigate('/login', {state:{from : location}}) : (inCart ? navigate("/cart") : handleCart(selectedProduct)) }
              title={inCart ? "go to cart" : "Add to cart"}
            >
              {inCart ? "Go to Cart" : <><ImCart /> Add to Cart</>}
            </button>
            <button className="btn w-fit m-0 s-byn-btn" title="Buy Now">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
