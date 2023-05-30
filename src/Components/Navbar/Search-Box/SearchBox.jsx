import React from "react";
import "./SearchBox.css";
import { useData } from "../../../Contexts/DataContext/DataContext";
import { IoSearch, RxCross1 } from "../../../Icons/Icons";
import {
  clearFilter,
  setSearchValue,
  setShowBurger,
  setShowSearch,
  setShowSearchedProducts,
} from "../../../DataReducer/Constants";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const {
    state: { showSearch, searchValue, searchedProducts, showSearchedProducts },
    dispatch,
  } = useData();
  const navigate = useNavigate();
  return (
    <>
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
              dispatch({ type: setSearchValue, payload: e.target.value });
              dispatch({ type: setShowSearchedProducts, payload: false });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch({ type: setShowSearchedProducts, payload: true });
                dispatch({ type: setShowBurger, payload: false });
                dispatch({ type: clearFilter });
                navigate("/products");
              }
            }}
            placeholder="What are you looking for ?"
          />
          {searchValue && (
            <RxCross1
              className="search-clr"
              onClick={() => dispatch({ type: setSearchValue, payload: "" })}
              title="Clear Search"
            />
          )}
          {searchValue && showSearch ? (
            <>
              {" "}
              <div
                className={`searchedOutput-container ${
                  showSearchedProducts ? "disp-none" : ""
                }`}
              >
                {searchedProducts.length === 0 ? (
                  <h1>We couldn't find what you were looking for</h1>
                ) : (
                  ""
                )}
                {searchedProducts?.map(
                  ({ _id, image, title, price, inStock }) => (
                    <>
                      <div
                        className={`searchedItem-box ${
                          !inStock ? "stock-checker" : ""
                        }`}
                        key={_id}
                        onClick={() => {
                          if (inStock) {
                            dispatch({ type: setSearchValue, payload: "" });
                            dispatch({ type: setShowSearch });
                            dispatch({ type: setShowBurger, payload: false });
                            navigate(`/singleProduct/${_id}`);
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
                          <h3>Price: ${price}</h3>
                        </div>
                      </div>
                    </>
                  )
                )}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBox;
