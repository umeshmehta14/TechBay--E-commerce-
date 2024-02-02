import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ShowProduct.css";
import { useWishList, useAuth, useCart, useData } from "../../../../Contexts";
import {
  AiFillStar,
  AiOutlineHeart,
  AiFillHeart,
  ImCart,
} from "../../../../Utils/Icons/Icons";

const ShowProduct = ({ item }) => {
  const { token } = useAuth();
  const { addProductToWishList, removeProductFromWishList, wishDisable } =
    useWishList();
  const { cartDisable, handleCartButton } = useCart();
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const {
    state: { wishlist },
  } = useData();

  const {
    _id,
    title,
    description,
    price,
    discountPercentage,
    original_price,
    rating,
    inCart,
    inStock,
    image,
    trending,
  } = item;

  const inWishlist = wishlist?.find((elem) => elem._id === _id);

  useEffect(() => {
    setDisable(cartDisable);
  }, [cartDisable]);

  return (
    <>
      <div
        key={_id}
        className={`product-card  ${
          !inStock ? "stock-checker cursor-disable" : ""
        }`}
        title={title}
      >
        {token && inWishlist ? (
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
            onClick={() => (inStock ? addProductToWishList(_id) : null)}
            title="Add to wishlist"
          />
        )}
        <div
          className="product-card-img"
          onClick={() => (inStock ? navigate(`/product/${_id}`) : null)}
        >
          <img src={image} alt={title} />
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
            onClick={() => navigate(`/product/${_id}`)}
          >
            <span className="rating">
              {rating}
              <AiFillStar />
            </span>
            <h3 className="product-title">{title}</h3>
            <p className="description">{description}</p>
            <div className="price-box">
              <h3 className="discount">{discountPercentage}% off</h3>
              <p className="original-price">&#8377;{original_price}</p>
              <p className="price">&#8377;{price}</p>
            </div>
          </div>
          <div className="btn-box">
            <button
              disabled={disable}
              className={`btn btn-p-w w-fit m-0 ${
                cartDisable ? "cursor-disable" : ""
              } ${inCart ? "third-color" : ""}`}
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
              disabled={disable}
              className="btn btn-p-w  w-fit m-0 byn-btn"
              title="Buy Now"
              onClick={() => handleCartButton(inCart, item, true)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowProduct;
