import React from "react";
import { useData } from "../../Contexts/DataContext/DataContext";
import { AiOutlineHeart } from "../../Utils/Icons/Icons";
import { useNavigate } from "react-router-dom";
import "./WishList.css";
import WishlistCard from "./wishlist component/WishlistCard";

export const WishList = () => {
  const {
    state: { products },
  } = useData();
  document.title = "Wishlist";

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
        <h1 className="empty-wishlist">WishList</h1>
      )}
      <div className="product-container product-container-wishlist">
        {wishlistData?.map((item) => (
          <WishlistCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};