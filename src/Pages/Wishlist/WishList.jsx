import React from "react";
import { useNavigate } from "react-router-dom";

import "./WishList.css";
import { useData } from "../../Contexts";
import WishlistCard from "./wishlist component/WishlistCard";
import { AiOutlineHeart } from "../../Utils/Icons/Icons";

export const WishList = () => {
  const {
    state: { wishlist },
  } = useData();
  document.title = "Wishlist";

  const navigate = useNavigate();

  return (
    <main className="container top-wish-6 wishlist-container">
      {wishlist?.length === 0 ? (
        <section className="empty-wishlist">
          <h1>
            Nothing Here Yet <AiOutlineHeart />
          </h1>
          <h2>Add Product You Like</h2>
          <button className="btn" onClick={() => navigate("/products")}>
            Add Product
          </button>
        </section>
      ) : (
        <h1 className="empty-wishlist">WishList</h1>
      )}
      <section className="product-container product-container-wishlist">
        {wishlist?.map((item) => (
          <WishlistCard key={item._id} item={item} />
        ))}
      </section>
    </main>
  );
};
