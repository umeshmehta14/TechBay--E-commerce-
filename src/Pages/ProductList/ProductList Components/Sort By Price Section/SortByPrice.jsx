import React from "react";

import "./SortByPrice.css";
import { useData } from "../../../../Contexts";
import { setArrangeType, setShowFilter } from "../../../../Utils/Constants";
import { HiOutlineFilter } from "../../../../Utils/Icons/Icons";

const SortByPrice = () => {
  const {
    dispatch,
    state: {
      filters,
      searchValue,
      products,
      productDetail: { productFetched },
    },
  } = useData();
  return (
    <>
      <div className={`sort-section`}>
        <div className="filter-button">
          <button
            className="filter-toggle-btn"
            onClick={() => dispatch({ type: setShowFilter })}
          >
            Filter <HiOutlineFilter />
          </button>
          <div className="sort-price">
            {searchValue ? (
              <h3 className="result-heading">
                Search Result for {searchValue}
              </h3>
            ) : products?.length === 0 ? null : (
              <div className="result-heading">
                <h3>
                  Showing All Products{" "}
                  <small className="pfc">{`(${products?.length} of ${productFetched})`}</small>
                </h3>
              </div>
            )}

            <div className="sort-by-price-main-btn-box">
              <button
                className={`sort-btn ${
                  filters.arrangeType === "LTH" ? "sort-btn-focus" : ""
                }`}
                onClick={() =>
                  dispatch({ type: setArrangeType, payload: "LTH" })
                }
              >
                Price- Low to High
              </button>
              <button
                className={`sort-btn b-l ${
                  filters.arrangeType === "HTL" ? "sort-btn-focus" : ""
                }`}
                onClick={() =>
                  dispatch({ type: setArrangeType, payload: "HTL" })
                }
              >
                Price- High to Low
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SortByPrice;
