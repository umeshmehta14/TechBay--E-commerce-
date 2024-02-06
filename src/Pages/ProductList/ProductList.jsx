import React, { useEffect, useState } from "react";

import { useData } from "../../Contexts";
import "./ProductList.css";
import Pagination from "./ProductList Components/Pagination/Pagination";
import Filters from "./ProductList Components/Product Filter/Filters";
import ShowProduct from "./ProductList Components/ShowProduct/ShowProduct";
import SortByPrice from "./ProductList Components/Sort By Price Section/SortByPrice";
import { AiOutlineArrowDown } from "../../Utils/Icons/Icons";

export const ProductList = () => {
  const { state } = useData();
  const {
    searchValue,
    productDetail: { currentPage, productFetched },
    products,
  } = state;
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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
