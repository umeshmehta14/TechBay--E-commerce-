import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import "./SingleProduct.css";
import { useWishList, useCart, useAuth, useData } from "../../Contexts";
import {
  AiFillStar,
  AiOutlineHeart,
  AiFillHeart,
  ImCart,
} from "../../Utils/Icons/Icons";

export const SingleProduct = () => {
  const {
    state: { products },
  } = useData();
  const { wishDisable, handleWishList } = useWishList();
  const { cartDisable, handleCartButton } = useCart();
  const { token } = useAuth();

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
    inWishlist,
    inCart,
    image,
    trending,
  } = selectedProduct;
  document.title = title;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <main className="container w-90 m-auto s-top-6">
      <div className="s-product-information-card" title={title}>
        {token && inWishlist ? (
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
        <section className="product-image-box">
          <img src={image} alt="Currently Not Available" />
          <span className={trending && "trending s-trending"}>
            {trending && "Trending"}
          </span>
        </section>
        <div className="s-product-details">
          <div className="s-product-info">
            <h1>{title}</h1>
            <span className="s-rating rating">
              {rating}
              <AiFillStar />
            </span>
            <h3 className="s-description">
              <em className="pfc"> Description </em> : {description}
            </h3>
            <h4 className="s-description">
              <em className="pfc"> Brand </em>: {brand}
            </h4>
            <h4 className="s-description">
              <em className="pfc"> Category </em>: {category}
            </h4>
            {inStock && (
              <p>
                <strong>Availability </strong> : In Stock
              </p>
            )}
          </div>
          <div className="s-price-box price-box">
            <h3 className="s-discount discount">{discountPercentage}% off</h3>
            <p className="s-original-price original-price">
              &#8377;{original_price}
            </p>
            <p className="s-price price">&#8377;{price}</p>
          </div>
          <div className="s-btn-box">
            <button
              disabled={cartDisable}
              className={`btn w-fit m-0 ${
                cartDisable ? "cursor-disable" : ""
              } ${inCart ? "third-color" : ""}`}
              onClick={() => handleCartButton(inCart, selectedProduct)}
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
              className="btn w-fit m-0 s-byn-btn"
              title="Buy Now"
              onClick={() => handleCartButton(inCart, selectedProduct, true)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
