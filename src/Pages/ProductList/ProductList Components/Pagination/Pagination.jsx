import React from "react";
import "./Pagination.css";
import { useData } from "../../../../Contexts/DataContext/DataContext";
import { setCurrentPage } from "../../../../Utils/Constants";
import {   MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,} from "../../../../Utils/Icons/Icons";

const Pagination = ({ totalProducts, productsPerPage }) => {
  const {
    state: { currentPage },
    dispatch,
  } = useData();
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pages.push(i);
  }

  const nextPage = ()=>{
    if(currentPage === 6){
      dispatch({type: setCurrentPage, payload: 1})
    }
    else{
      dispatch({type: setCurrentPage, payload: currentPage+1})

    }
  }
  const prevPage = ()=>{
    if(currentPage === 1){
      dispatch({type: setCurrentPage, payload: 6})
    }
    else{
      dispatch({type: setCurrentPage, payload: currentPage-1})
    }
  }

  return (
    <div className="pagination-btn-container">
      <div className="pagination-btn-box">
        {pages?.map((page, index) => (
          <button
            className={`page-btn ${currentPage === page ? "page-active" : ""}`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              dispatch({ type: setCurrentPage, payload: page });
            }}
            key={index}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="nxt-prev-btn-box">
      <button className="nxt-prev-btn" disabled={currentPage === 1} title="Previous" onClick={()=> prevPage()}><MdKeyboardDoubleArrowLeft/></button>
      <button className="nxt-prev-btn" disabled={currentPage === pages.length} title="Next" onClick={()=> nextPage()}><MdKeyboardDoubleArrowRight/></button>
      </div>
    </div>
  );
};

export default Pagination;
