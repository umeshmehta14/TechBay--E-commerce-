import React from 'react'
import { useProducts } from '../../Contexts/DataContext'
import {AiOutlineHeart,AiFillStar} from "../../Icons/Icons"
import "./ProductList.css";

const ProductList = () => {
  const {state:{products,category}} = useProducts();
  return (
    <div className='container'>
      {/* <div className="filter-container">
        <button>Clear</button>
        <div>
          {
            category.map(({id, categoryName})=>{
              return <label key={id} htmlFor={id}>
                <input type="checkbox" name={categoryName} id={id} />
                {categoryName}
              </label>
            })
          }
        </div>
      </div> */}
      <h1>Showing All Product</h1>
      <div className="product-container">
        {
          products.filter(({feature})=> !feature).map((item)=>{
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
            return <div key={id} className='product-card'>
              <AiOutlineHeart className='wishList-icon'/>
              <div className="product-card-img">
              <img src={image} alt="Stay Tuned" width={"100px"}/>
              <span>{trending ? "Trending":""}</span>
              </div>
              <div className="product-card-info">
              <span className='rating'>{rating}<AiFillStar/></span>
              <h3 className='product-title'>{title}</h3>
              <div className="price-box">
              <h3 className='discount'>{discountPercentage}% off</h3>
              <p className='original-price'>${original_price}</p>
              <p className='price'>${price}</p>
              </div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default ProductList
