import React from "react";
import { useData } from "../../Contexts/DataContext/DataContext";
import {
  AiFillStar,
  AiOutlineHeart,
  AiFillHeart,
  ImCart,
} from "../../Icons/Icons";
import { useNavigate } from "react-router-dom";
import "./WishList.css";
import { useWishList } from "../../Contexts/WishListContext/WishListContext";
import { useCart } from "../../Contexts/CartContext/CartContext";
const WishList = () => {
  const {
    state: { products },
  } = useData();
  const { handleWishList, wishDisable } = useWishList();
  const { handleCart } = useCart();
  const navigate = useNavigate();

  const wishlistData = products.filter(({ inWishlist }) => inWishlist);
  return (
    <div className="container top-wish-6 wishlist-container">
      {wishlistData.length === 0 ? (
        <div className="empty-wishlist">
          <h1>
            Nothing Here Yet <AiOutlineHeart />
          </h1>
          <h2>Add Product You Like</h2>
          <button className="btn" onClick={() => navigate("/products")}>
            Add Product
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="product-container product-container-wishlist">
        {wishlistData.map((item) => {
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
            image,
            trending,
          } = item;
          return (
            <div key={_id} className={`product-card product-card-wishlist`}>
              {inWishlist ? (
                <AiFillHeart
                  className={`c-red wishList-icon ${
                    wishDisable && "cursor-disable"
                  }`}
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
                    <p className="original-price">${original_price}</p>
                    <p className="price">${price}</p>
                  </div>
                </div>
                <div className="btn-box">
                  <button
                    className="btn btn-p-w w-fit m-0"
                    onClick={() =>
                      inCart ? navigate("/cart") : handleCart(item)
                    }
                  >
                    {inCart ? (
                      "Go to Cart"
                    ) : (
                      <>
                        <ImCart /> Add to Cart
                      </>
                    )}
                  </button>
                  <button className="btn btn-p-w  w-fit m-0 byn-btn">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default WishList;
