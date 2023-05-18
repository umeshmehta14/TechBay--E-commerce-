import React, { useState } from "react";
import { useData } from "../../Contexts/DataContext/DataContext";
import "./ProductList.css";
import Pagination from "./ProductList Components/Pagination/Pagination";
import Filters from "./ProductList Components/Product Filter/Filters";
import ShowProduct from "./ProductList Components/ShowProduct/ShowProduct";
import SortByPrice from "./ProductList Components/Sort By Price Section/SortByPrice";
import { filterAllProducts } from "../../Utils/Utils";

const ProductList = () => {
  const {
    state: { products, category, currentPage },
  } = useData();
  const filteredProducts = filterAllProducts();

  const productsPerPage = 10;
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const displayedProducts = filteredProducts.slice(firstPostIndex, lastPostIndex);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="container wpl-90 top-5">
      <SortByPrice setShowFilter={setShowFilter} showFilter={showFilter} />
      <div className="main-product-page">
        <Filters
          category={category}
          products={products}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />
        <div className="product-container">
          {displayedProducts.map((item) => (
            <ShowProduct key={item.id} item={item} />
          ))}
        </div>
      </div>

      <Pagination
        totalProducts={filteredProducts.length}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductList;
