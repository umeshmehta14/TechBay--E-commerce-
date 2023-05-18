import React from "react";
import { useData } from "../../Contexts/DataContext/DataContext";
import "./ProductList.css";
import Pagination from "./ProductList Components/Pagination/Pagination";
import Filters from "./ProductList Components/Product Filter/Filters";
import ShowProduct from "./ProductList Components/ShowProduct/ShowProduct";
import SortByPrice from "./ProductList Components/Sort By Price Section/SortByPrice";
import { filterAllProducts } from "../../Utils/Utils";

const ProductList = () => {
  const {
    state: { currentPage },
  } = useData();
  const filteredProducts = filterAllProducts();

  const productsPerPage = 10;
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const displayedProducts = filteredProducts.slice(
    firstPostIndex,
    lastPostIndex
  );

  return (
    <div className="container wpl-90 top-5">
      <SortByPrice />
      <div className="main-product-page">
        <Filters />
        <div className="product-container">
          {displayedProducts.map((item) => (
            <ShowProduct key={item.id} item={item} />
          ))}
        </div>
      </div>

      {filteredProducts.length > 10 ? (
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
