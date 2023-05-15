import React from 'react'
import { RxCross1, MdOutlineFilterAltOff } from "../../../../Icons/Icons";
import "./Filter.css";

const Filters = ({category, products, showFilter, setShowFilter}) => {
    const brands = [...new Set(products.map(({ brand }) => brand))];
    const ratings = [1,2,3,4,];
  return (
    <>
      <div className={`filter-container ${showFilter ? "w-90 p-1 v-1" :"v-0"}`}>
        <div className="filter-clear-section">
          <h2 className="filter-heading">Filters</h2>
        <div className="cross-filter d-none" onClick={()=> setShowFilter(!showFilter)}><RxCross1/></div>
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
    </>
  )
}

export default Filters
