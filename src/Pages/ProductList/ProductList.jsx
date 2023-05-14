import React, { useState } from "react";
import { useProducts } from "../../Contexts/DataContext";
import { AiOutlineHeart, AiFillStar, HiOutlineFilter, RxCross1, MdOutlineFilterAltOff } from "../../Icons/Icons";
import "./ProductList.css";
import "./Filter.css";

const ProductList = () => {
  const {
    state: { products, category },
  } = useProducts();

  const [showFilter, setShowFilter] = useState(false);

  const brands = [...new Set(products.map(({ brand }) => brand))];
  const ratings = [1,2,3,4,];
  return (
    <div className="container">
      <div className="sort-section">
        <div className="filter-button">
          <button className="filter-toggle-btn" onClick={()=> setShowFilter(!showFilter)}>
            Filter <HiOutlineFilter />
          </button>
          <div className="sort-price">
          <button  className="sort-btn">Price- Low to High</button>
          <button className="sort-btn">Price- High to Low</button>
        </div>
        </div>
      </div>
      <div className={`filter-container ${showFilter ? " w-90" :"p-0"}`}>
        <div className="filter-clear-section">
        <div className="cross-filter" onClick={()=> setShowFilter(!showFilter)}><RxCross1/></div>
        <button className="filter-clr-btn">Clear  <MdOutlineFilterAltOff/></button>
        </div>
        <div className="price-filter">
          <label htmlFor="range"><h3>
            Price
            </h3> 
          </label>
          <input type="range" id="range"/>
        </div>
        <div className="category-filter">
          <h3>Category</h3>
          {category.map(({ id, categoryName }) => {
            return (
              <label key={id} htmlFor={id}>
                <input type="checkbox" name={categoryName} id={id} />
                {categoryName}
              </label>
            );
          })}
        </div>
        <div className="ratings-sort">
          <h3>Rating</h3>
          {
            ratings.map((item, index) => <label key={index} htmlFor={item+"rs"}>
            <input type="radio" name={item} id={item+"rs"} />
            {item} Stars & Above
          </label>)
            }
          
        </div>
        <div className="trending-filter">
          <h3>Trending</h3>
          <label htmlFor="t-f">
            <input type="checkbox" name="trending-filter" id="t-f" />
            Only Trending
          </label>
        </div>
        <div className="stock-filter">
          <h3>In Stock</h3>
          <label htmlFor="s-f">
            <input type="checkbox" name="stock-filter" id="s-f" />
            Include Out of Stock
          </label>
        </div>
        <div className="brand-filter">
          <h3>Brands</h3>
          {brands.map((name, index) => (
            <label key={index} htmlFor={name}>
              <input type="checkbox" name={name} id={name} />
              {name}
            </label>
          ))}
        </div>
      </div>
      <h1>Showing All Product</h1>
      <div className="product-container">
        {products
          .filter(({ feature }) => !feature)
          .map((item) => {
            const {
              id,
              title,
              description,
              price,
              discountPercentage,
              original_price,
              rating,
              inStock,
              image,
              trending,
            } = item;
            return (
              <div
                key={id}
                className={`product-card ${!inStock ? "stock-checker" : ""}`}
              >
                <AiOutlineHeart className="wishList-icon" />
                <div className="product-card-img">
                  <img src={image} alt="Stay Tuned" width={"100px"} />
                  {inStock ? (
                    <span className={trending && "trending"}>
                      {trending && "Trending"}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="product-card-info">
                  <span className="rating">
                    {rating}
                    <AiFillStar />
                  </span>
                  <h3 className="product-title">{title}</h3>
                  <div className="price-box">
                    <h3 className="discount">{discountPercentage}% off</h3>
                    <p className="original-price">${original_price}</p>
                    <p className="price">${price}</p>
                  </div>
                </div>
                <div className="btn-box">
                  <button className="btn">Add to Cart</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductList;
