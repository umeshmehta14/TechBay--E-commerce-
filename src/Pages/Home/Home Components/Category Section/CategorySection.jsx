import React, { useState } from 'react'
import {
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
  } from "../../../../Icons/Icons";
  import "./CategorySection.css"

const CategorySection = ({category}) => {
    const [categoryIndex, setCategoryIndex] = useState(0);

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

  return (
    <>
      <div className="category-section">
          <div className="category-heading">
            <h3>Select By</h3>
            <h1>Categories</h1>
          </div>
          <div className="category-container-mobile">
            <div className="category-item" key={curCategory?.id}>
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
                <div className="category-item" key={id}>
                  <img className="category-img" src={image} alt="Categories" />
                  <h2>{categoryName}</h2>
                </div>
              );
            })}
          </div>
        </div>
    </>
  )
}

export default CategorySection
