import React from "react";
import { HiOutlineFilter } from "../../../../Icons/Icons";
import "./SortByPrice.css";
import { useData } from "../../../../Contexts/DataContext/DataContext";
import { setArrangeType, setShowFilter } from "../../../../DataReducer/Constants";
const SortByPrice = ({displayedProducts}) => {
  const {
    dispatch,
    state: { filters, searchValue },
  } = useData();
  return (
    <>
      <div className="sort-section">
        <div className="filter-button">
          <button
            className="filter-toggle-btn"
            onClick={() => dispatch({type:setShowFilter})}
          >
            Filter <HiOutlineFilter />
          </button>
          <div className="sort-price">
            <h3>{searchValue ? `Search Result for ${searchValue}`: displayedProducts.length === 0 ?"": "Showing all products"}</h3>
            <div className="sort-by-price-main-btn-box">

            <button
              className={`sort-btn ${
                filters.arrangeType === "LTH" ? "sort-btn-focus" : ""
              }`}
              onClick={() => dispatch({ type: setArrangeType, payload: "LTH" })}
            >
              Price- Low to High
            </button>
            <button
              className={`sort-btn b-l ${
                filters.arrangeType === "HTL" ? "sort-btn-focus" : ""
              }`}
              onClick={() => dispatch({ type: setArrangeType, payload: "HTL" })}
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
