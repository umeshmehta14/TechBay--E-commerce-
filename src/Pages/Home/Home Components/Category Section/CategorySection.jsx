import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "../../../../Icons/Icons";
import "./CategorySection.css";
import {
  clearFilter,
  setCategoryFilter,
  setSearchValue,
} from "../../../../DataReducer/Constants";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../../Contexts/DataContext/DataContext";

const CategorySection = ({ category }) => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const { dispatch } = useData();
  const navigate = useNavigate();

  const nextSlide = () => {
    if (categoryIndex === category.length - 1) {
      setCategoryIndex(0);
    } else {
      setCategoryIndex(categoryIndex + 1);
    }
  };
  const previousSlide = () => {
    if (categoryIndex === 0) {
      setCategoryIndex(category.length - 1);
    } else {
      setCategoryIndex(categoryIndex - 1);
    }
  };
  const curCategory = category[categoryIndex];
  useEffect(() => {
    setInterval(() => {
      setCategoryIndex((prev) => (prev === category.length - 1 ? 0 : prev + 1));
    }, 2500);
  }, [category.length]);

  return (
    <>
      <div className="category-section">
        <div className="category-heading">
          <h3>Select By</h3>
          <h1>Categories</h1>
        </div>
        <div className="category-container-mobile">
          <div
            className="category-item"
            key={curCategory?.id}
            onClick={() => {
              dispatch({ type: setSearchValue, payload: "" });
              dispatch({ type: clearFilter });
              dispatch({
                type: setCategoryFilter,
                payload: curCategory?.categoryName,
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/products");
            }}
          >
            <img
              className="category-img"
              src={curCategory?.image}
              alt="Categories"
            />
            <h2>{curCategory?.categoryName}</h2>
          </div>
          <p className="arrow-btn" onClick={() => previousSlide()}>
            <AiOutlineArrowLeft />
          </p>
          <p className="arrow-btn arrow-right" onClick={() => nextSlide()}>
            <AiOutlineArrowRight />
          </p>
        </div>
        <div className="category-container">
          {category.map(({ id, categoryName, image }) => {
            return (
              <div
                className="category-item"
                key={id}
                onClick={() => {
                  dispatch({ type: setSearchValue, payload: "" });
                  dispatch({ type: clearFilter });
                  dispatch({ type: setCategoryFilter, payload: categoryName });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  navigate("/products");
                }}
              >
                <img className="category-img" src={image} alt="Categories" />
                <h2>{categoryName}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CategorySection;
