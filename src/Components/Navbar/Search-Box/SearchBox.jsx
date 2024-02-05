import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import "./SearchBox.css";
import { useData } from "../../../Contexts";
import {
  SET_FILTER_SEARCH_TEXT,
  CLEAR_FILTER,
  SET_SEARCH_VALUE,
  SET_SHOW_BURGER,
  SET_SHOW_SEARCH,
  SET_SHOW_SEARCHED_PRODUCTS,
} from "../../../Utils/Constants";
import { IoSearch, RxCross1 } from "../../../Utils/Icons/Icons";
import { SearchLoader } from "../../Loader/Loader";

export const SearchBox = () => {
  const {
    state: {
      showSearch,
      searchValue,
      searchedProducts,
      showSearchedProducts,
      searchLoader,
    },
    dispatch,
    getSearchProducts,
  } = useData();
  const navigate = useNavigate();

  const debounce = (func, delay) => {
    let timeoutId;
    return (args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(args);
      }, delay);
    };
  };

  const debouncedFetchData = useCallback(debounce(getSearchProducts, 500), [
    getSearchProducts,
  ]);

  return (
    <div
      className={`search-input-box ${
        showSearch ? "show slide-in" : "slide-out"
      }`}
    >
      <div className="search-main-box">
        <label htmlFor="search">
          <IoSearch />
        </label>

        <input
          type="text"
          className="search-btn"
          id="search"
          value={searchValue}
          onChange={(e) => {
            dispatch({ type: SET_SEARCH_VALUE, payload: e.target.value });
            dispatch({ type: SET_SHOW_SEARCHED_PRODUCTS, payload: false });
            debouncedFetchData(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch({ type: SET_SHOW_SEARCHED_PRODUCTS, payload: true });
              dispatch({ type: SET_SHOW_BURGER, payload: false });
              dispatch({ type: CLEAR_FILTER });
              dispatch({
                type: SET_FILTER_SEARCH_TEXT,
                payload: searchValue,
              });

              navigate("/products");
            }
          }}
          placeholder="What are you looking for ?"
        />
        {searchValue && (
          <RxCross1
            className="search-clr"
            onClick={() => {
              dispatch({ type: SET_SEARCH_VALUE, payload: "" });
              dispatch({
                type: SET_FILTER_SEARCH_TEXT,
                payload: "",
              });
            }}
            title="Clear Search"
          />
        )}
        {searchValue && showSearch ? (
          <>
            <div
              className={`searchedOutput-container ${
                showSearchedProducts ? "disp-none" : ""
              }`}
            >
              {searchLoader ? (
                <SearchLoader />
              ) : searchedProducts?.length === 0 ? (
                <h1>We couldn't find what you were looking for</h1>
              ) : (
                searchedProducts?.map(
                  ({ _id, image, title, price, inStock }) => (
                    <>
                      <div
                        className={`searchedItem-box ${
                          !inStock ? "stock-checker" : ""
                        }`}
                        key={_id}
                        onClick={() => {
                          if (inStock) {
                            dispatch({ type: SET_SEARCH_VALUE, payload: "" });
                            dispatch({ type: SET_SHOW_SEARCH });
                            dispatch({
                              type: SET_SHOW_BURGER,
                              payload: false,
                            });
                            navigate(`/product/${_id}`);
                          }
                        }}
                      >
                        <div className="searched-product-img">
                          <img src={image} alt="Currently Not Available" />
                        </div>
                        <div className="searched-product-info">
                          {searchValue ? (
                            <h2 className="pfc">
                              {title
                                .split(new RegExp(`(${searchValue})`, "gi"))
                                ?.map((substring, index) =>
                                  substring.toLowerCase() ===
                                  searchValue.toLowerCase() ? (
                                    <em
                                      style={{
                                        backgroundColor: "lightblue",
                                      }}
                                      key={index}
                                    >
                                      {substring}
                                    </em>
                                  ) : (
                                    <strong key={index}>{substring}</strong>
                                  )
                                )}
                            </h2>
                          ) : (
                            <h2 className="pfc">{title}</h2>
                          )}
                          <h3>Price: &#8377;{price}</h3>
                        </div>
                      </div>
                    </>
                  )
                )
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
