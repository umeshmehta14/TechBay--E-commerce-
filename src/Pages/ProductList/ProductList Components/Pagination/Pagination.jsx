import React from "react";
import "./Pagination.css";
import { useData } from "../../../../Contexts/DataContext/DataContext";
import { setCurrentPage } from "../../../../DataReducer/Constants";

const Pagination = ({ totalProducts, productsPerPage }) => {
  const { state:{currentPage}, dispatch } = useData();
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-btn-box">
      {pages.map((page, index) => (
        <button
          className={`page-btn ${currentPage === page ? "page-active" : ""}`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            dispatch({type: setCurrentPage, payload: page})
          }}
          key={index}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
