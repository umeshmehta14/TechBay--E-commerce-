import React from 'react'
import "./Pagination.css";

const Pagination = ({totalProducts, productsPerPage, setCurrentPage, currentPage}) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalProducts/ productsPerPage); i++) {
        pages.push(i);
    }

  return (
    <div className='pagination-btn-box'>
      {
        pages.map((page, index)=> <button className={`page-btn ${currentPage === page ? "page-active" :""}`} onClick={()=> {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setCurrentPage(page)}} key={index}>{page}</button>)
      }
    </div>
  )
}

export default Pagination
