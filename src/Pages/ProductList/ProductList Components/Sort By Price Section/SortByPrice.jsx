import React from 'react'
import {  HiOutlineFilter } from "../../../../Icons/Icons";
import "./SortByPrice.css";
const SortByPrice = ({setShowFilter ,showFilter}) => {
  return (
    <>
      <div className="sort-section">
        <div className="filter-button">
          <button className="filter-toggle-btn" onClick={()=> setShowFilter(!showFilter)}>
            Filter <HiOutlineFilter />
          </button>
          <div className="sort-price">
          <button  className="sort-btn">Price- Low to High</button>
          <button className="sort-btn b-l">Price- High to Low</button>
        </div>
        </div>
      </div>
    </>
  )
}

export default SortByPrice
