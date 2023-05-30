import React, { useEffect, useState } from "react";
import { useData } from "../../Contexts/DataContext/DataContext";
import "./ProductList.css";
import Pagination from "./ProductList Components/Pagination/Pagination";
import Filters from "./ProductList Components/Product Filter/Filters";
import ShowProduct from "./ProductList Components/ShowProduct/ShowProduct";
import SortByPrice from "./ProductList Components/Sort By Price Section/SortByPrice";
import { filterAllProducts } from "../../Utils/Utils";
import { setCurrentPage } from "../../DataReducer/Constants";
import { AiOutlineArrowDown } from "../../Icons/Icons";

const ProductList = () => {
  const { state, dispatch } = useData();
  const { currentPage, searchValue } = state;
  const filteredProducts = filterAllProducts(state);
  document.title = "Products";

  const productsPerPage = 8;
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const displayedProducts = filteredProducts.slice(
    firstPostIndex,
    lastPostIndex
  );

  const [scrollToBottom, setScrollToBottom] = useState(false);

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight - 1000,
      behavior: "smooth",
    });
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
    if (filteredProducts.length <= 8) {
      dispatch({ type: setCurrentPage, payload: 1 });
    } else if (
      currentPage > Math.ceil(filteredProducts.length / productsPerPage)
    ) {
      dispatch({
        type: setCurrentPage,
        payload: Math.ceil(filteredProducts.length / productsPerPage),
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filteredProducts.length, currentPage, dispatch]);

  return (
    <>
      <div className="container wpl-90 top-5">
        <SortByPrice displayedProducts={displayedProducts} />
        <div className="main-product-page">
          <Filters />
          <div className="product-container">
            {displayedProducts.length === 0 ? (
              <h1 className="no-product-heading">
                {searchValue
                  ? "We couldn't find what you were looking for"
                  : "No Products available in this category"}
              </h1>
            ) : null}
            {displayedProducts?.map((item) => (
              <ShowProduct key={item.id} item={item} />
            ))}
          </div>
        </div>

        {filteredProducts.length > 8 ? (
          <Pagination
            totalProducts={filteredProducts.length}
            productsPerPage={productsPerPage}
          />
        ) : (
          ""
        )}
      </div>
      {displayedProducts.length >= 6 && (
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

export default ProductList;
