import React from "react";
import { HiOutlineFilter } from "../../../../Icons/Icons";
import "./SortByPrice.css";
import { useData } from "../../../../Contexts/DataContext/DataContext";
import { setArrangeType, setShowFilter } from "../../../../DataReducer/Constants";
const SortByPrice = () => {
  const {
    dispatch,
    state: { filters },
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
    </>
  );
};

export default SortByPrice;
