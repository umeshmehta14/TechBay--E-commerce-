import React, { useEffect } from "react";
import { useData } from "../../Contexts/DataContext/DataContext";
import "./ProductList.css";
import Pagination from "./ProductList Components/Pagination/Pagination";
import Filters from "./ProductList Components/Product Filter/Filters";
import ShowProduct from "./ProductList Components/ShowProduct/ShowProduct";
import SortByPrice from "./ProductList Components/Sort By Price Section/SortByPrice";
import { filterAllProducts } from "../../Utils/Utils";
import { setCurrentPage } from "../../DataReducer/Constants";

const ProductList = () => {
  const {
    state: { currentPage, searchValue },
    dispatch,
  } = useData();
  const filteredProducts = filterAllProducts();

  const productsPerPage = 8;
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const displayedProducts = filteredProducts.slice(
    firstPostIndex,
    lastPostIndex
  );

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
    <div className="container wpl-90 top-5">
      <SortByPrice />
      <div className="main-product-page">
        <Filters />
        {displayedProducts.length === 0 ? (
          <h1>
            {searchValue
              ? "We couldn't find what you were looking for"
              : "No Products available in this category"}
          </h1>
        ) : null}
        <div className="product-container">
          {displayedProducts.map((item) => (
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
  );
};

export default ProductList;
