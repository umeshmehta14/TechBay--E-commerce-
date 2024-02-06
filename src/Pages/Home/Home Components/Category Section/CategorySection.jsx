import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CategorySection.css";
import { useData } from "../../../../Contexts";
import {
  CLEAR_FILTER,
  SET_CATEGORY_FILTER,
  SET_SEARCH_VALUE,
} from "../../../../Utils/Constants";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "../../../../Utils/Icons/Icons";

const CategorySection = () => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const {
    dispatch,
    state: { category },
  } = useData();

  const navigate = useNavigate();

  const nextSlide = () =>
    categoryIndex === category?.length - 1
      ? setCategoryIndex(0)
      : setCategoryIndex(categoryIndex + 1);

  const previousSlide = () =>
    categoryIndex === 0
      ? setCategoryIndex(category?.length - 1)
      : setCategoryIndex(categoryIndex - 1);

  const curCategory = category[categoryIndex];
  useEffect(() => {
    setInterval(() => {
      setCategoryIndex((prev) =>
        prev === category?.length - 1 ? 0 : prev + 1
      );
    }, 2500);
  }, [category?.length]);

  return (
    <>
      <section className="category-section">
        <div className="category-heading">
          <h3>Select By</h3>
          <h1>Categories</h1>
        </div>
        <div className="category-container-mobile">
          <div
            className="category-item"
            onClick={() => {
              dispatch({ type: SET_SEARCH_VALUE, payload: "" });
              dispatch({ type: CLEAR_FILTER });
              dispatch({
                type: SET_CATEGORY_FILTER,
                payload: curCategory?.categoryName,
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/products");
            }}
            title={curCategory?.categoryName}
          >
            <img
              className="category-img"
              src={curCategory?.image}
              alt={curCategory?.categoryName}
            />
            <h2>{curCategory?.categoryName}</h2>
          </div>
          <p className="arrow-btn" onClick={previousSlide}>
            <AiOutlineArrowLeft />
          </p>
          <p className="arrow-btn arrow-right" onClick={nextSlide}>
            <AiOutlineArrowRight />
          </p>
        </div>
        <div className="category-container">
          {category?.map(({ _id, categoryName, image }) => {
            return (
              <div
                className="category-item"
                key={_id}
                onClick={() => {
                  dispatch({ type: SET_SEARCH_VALUE, payload: "" });
                  dispatch({ type: CLEAR_FILTER });
                  dispatch({
                    type: SET_CATEGORY_FILTER,
                    payload: categoryName,
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  navigate("/products");
                }}
                title={categoryName}
              >
                <img className="category-img" src={image} alt={categoryName} />
                <h2>{categoryName}</h2>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default CategorySection;
