import React from "react";
import { RxCross1, MdOutlineFilterAltOff } from "../../../../Utils/Icons/Icons";
import "./Filter.css";
import { useData } from "../../../../Contexts";
import {
  CLEAR_FILTER,
  SET_BRAND_FILTER,
  SET_CATEGORY_FILTER,
  SET_OUT_OF_STOCK,
  SET_PRICE,
  SET_SHOW_FILTER,
  SET_TRENDING,
  SORT_BY_RATING,
} from "../../../../Utils/Constants";

const Filters = () => {
  const {
    dispatch,
    state: { filters, category, showFilter, brands },
  } = useData();
  const ratings = [1, 2, 3, 4, 5];
  const prices = [500, 1000, 2000, 3000, 4000];

  return (
    <div className={`filter-container ${showFilter ? "w-90" : ""}`}>
      <div className="filter-clear-section">
        <h2 className="filter-heading">Filters</h2>
        <div
          className="cross-filter d-none"
          onClick={() => dispatch({ type: SET_SHOW_FILTER })}
        >
          <RxCross1 />
        </div>
        <button
          className="filter-clr-btn"
          onClick={() => dispatch({ type: CLEAR_FILTER })}
        >
          Clear <MdOutlineFilterAltOff />
        </button>
      </div>
      <div className="ratings-sort">
        <label htmlFor="range">
          <h3>Ratings</h3>
          <small>{"Less Than " + filters?.rating} Star</small>
        </label>
        <input
          type="range"
          list="rating-inp"
          min="1"
          max="5"
          id="range"
          value={filters?.rating}
          onChange={(e) =>
            dispatch({ type: SORT_BY_RATING, payload: e.target.value })
          }
        />
        <datalist id="rating-inp">
          {ratings?.map((item) => (
            <option key={item} value={item} label={`<${item}`}></option>
          ))}
        </datalist>
      </div>
      <div className="category-filter">
        <h3>Category</h3>
        {category?.map(({ _id, categoryName }) => {
          return (
            <label key={_id} htmlFor={_id}>
              <input
                type="checkbox"
                name={categoryName}
                checked={filters?.category?.includes(categoryName)}
                id={_id}
                onChange={() =>
                  dispatch({
                    type: SET_CATEGORY_FILTER,
                    payload: categoryName,
                  })
                }
              />
              {categoryName}
            </label>
          );
        })}
      </div>
      <div className="price-filter">
        <h3>Price</h3>
        {prices?.map((item) => (
          <label key={item} htmlFor={item + "rs"}>
            <input
              type="radio"
              checked={filters.price === item}
              name={item}
              id={item + "rs"}
              onChange={() => dispatch({ type: SET_PRICE, payload: item })}
            />
            Less Than &#8377;{item}
          </label>
        ))}
      </div>
      <div className="trending-filter">
        <h3>Trending</h3>
        <label htmlFor="trending-sort">
          <input
            type="checkbox"
            checked={filters.trending}
            name="trending-filter"
            id="trending-sort"
            onChange={() => dispatch({ type: SET_TRENDING })}
          />
          Only Trending
        </label>
      </div>
      <div className="stock-filter">
        <h3>In Stock</h3>
        <label htmlFor="stock-sort">
          <input
            type="checkbox"
            checked={filters.includeOutStock}
            name="stock-filter"
            id="stock-sort"
            onChange={() => dispatch({ type: SET_OUT_OF_STOCK })}
          />
          Include Out of Stock
        </label>
      </div>
      <div className="brand-filter">
        <h3>Brands</h3>
        {brands?.map((name) => (
          <label key={name} htmlFor={name}>
            <input
              type="checkbox"
              name={name}
              checked={filters.brand.includes(name)}
              id={name}
              onChange={() =>
                dispatch({ type: SET_BRAND_FILTER, payload: name })
              }
            />
            {name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filters;
