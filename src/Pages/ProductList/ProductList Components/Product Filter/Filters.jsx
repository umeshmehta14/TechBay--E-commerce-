import React from "react";
import { RxCross1, MdOutlineFilterAltOff } from "../../../../Utils/Icons/Icons";
import "./Filter.css";
import { useData } from "../../../../Contexts";
import {
  clearFilter,
  setBrandFilter,
  setCategoryFilter,
  setOutOfStock,
  setPrice,
  setShowFilter,
  setTrending,
  sortByRating,
} from "../../../../Utils/Constants";

const Filters = () => {
  const {
    dispatch,
    state: { filters, category, showFilter, brands },
  } = useData();
  const ratings = [1, 2, 3, 4, 5];
  const prices = [500, 1000, 2000, 3000, 4000];

  return (
    <>
      <div className={`filter-container ${showFilter ? "w-90" : ""}`}>
        <div className="filter-clear-section">
          <h2 className="filter-heading">Filters</h2>
          <div
            className="cross-filter d-none"
            onClick={() => dispatch({ type: setShowFilter })}
          >
            <RxCross1 />
          </div>
          <button
            className="filter-clr-btn"
            onClick={() => dispatch({ type: clearFilter })}
          >
            Clear <MdOutlineFilterAltOff />
          </button>
        </div>
        <div className="ratings-sort">
          <label htmlFor="range">
            <h3>Ratings</h3>
            <small>{"Less Than " + filters.rating} Star</small>
          </label>
          <input
            type="range"
            list="rating-inp"
            min="1"
            max="5"
            id="range"
            value={filters.rating}
            onChange={(e) =>
              dispatch({ type: sortByRating, payload: e.target.value })
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
          {category?.map(({ id, categoryName }) => {
            return (
              <label key={id} htmlFor={id}>
                <input
                  type="checkbox"
                  name={categoryName}
                  checked={filters.category.includes(categoryName)}
                  id={id}
                  onChange={() =>
                    dispatch({ type: setCategoryFilter, payload: categoryName })
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
                onChange={() => dispatch({ type: setPrice, payload: item })}
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
              onChange={() => dispatch({ type: setTrending })}
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
              onChange={() => dispatch({ type: setOutOfStock })}
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
                  dispatch({ type: setBrandFilter, payload: name })
                }
              />
              {name}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default Filters;
