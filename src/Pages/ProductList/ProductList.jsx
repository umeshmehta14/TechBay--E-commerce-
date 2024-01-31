import React, { useEffect, useState } from "react";

import { useData } from "../../Contexts";
import "./ProductList.css";
import Pagination from "./ProductList Components/Pagination/Pagination";
import Filters from "./ProductList Components/Product Filter/Filters";
import ShowProduct from "./ProductList Components/ShowProduct/ShowProduct";
import SortByPrice from "./ProductList Components/Sort By Price Section/SortByPrice";
import { filterAllProducts } from "../../Utils/Utils";
import { SET_PAGE } from "../../Utils/Constants";
import { AiOutlineArrowDown } from "../../Utils/Icons/Icons";

export const ProductList = () => {
  const { state, dispatch } = useData();
  const {
    searchValue,
    productDetail: { totalPage, currentPage, productFetched },
    products,
  } = state;
  const filteredProducts = filterAllProducts(state);
  document.title = "Products";

  const [scrollToBottom, setScrollToBottom] = useState(false);

  const handleScrollToBottom = () =>
    window.scrollTo({
      top: document.documentElement.scrollHeight - 1000,
      behavior: "smooth",
    });

  const handleScrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - 1000;

      setScrollToBottom(scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // if (products?.length < 8) {
    //   dispatch({ type: SET_PAGE, payload: 1 });
    // } else if (currentPage > totalPage) {
    //   dispatch({
    //     type: SET_PAGE,
    //     payload: totalPage,
    //   });
    // }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filteredProducts.length, currentPage, dispatch]);

  return (
    <>
      <main className="container wpl-90 top-5">
        <SortByPrice />
        <div className="main-product-page">
          <Filters />
          <section className="product-container">
            {products?.length === 0 ? (
              <h1 className="no-product-heading">
                {searchValue
                  ? "We couldn't find what you were looking for"
                  : "No Products available in this category"}
              </h1>
            ) : null}
            {products?.map((item) => (
              <ShowProduct key={item._id} item={item} />
            ))}
          </section>
        </div>

        {productFetched > 8 ? <Pagination /> : null}
      </main>
      {products?.length > 6 && (
        <AiOutlineArrowDown
          title={scrollToBottom ? "Scroll To Top" : "Scroll To Bottom"}
          className={`arrow-btn sd-btn ${
            scrollToBottom ? "btn-transform" : ""
          }`}
          onClick={() =>
            scrollToBottom ? handleScrollToTop() : handleScrollToBottom()
          }
        />
      )}
    </>
  );
};
