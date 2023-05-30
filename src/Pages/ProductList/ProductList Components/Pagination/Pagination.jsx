import React from "react";
import "./Pagination.css";
import { useData } from "../../../../Contexts/DataContext/DataContext";
import { setCurrentPage } from "../../../../Utils/Constants";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "../../../../Utils/Icons/Icons";

const Pagination = ({ totalProducts, productsPerPage }) => {
  const {
    state: { currentPage },
    dispatch,
  } = useData();
  const pageCount = Math.ceil(totalProducts / productsPerPage);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  const nextPage = () =>
    currentPage === 6
      ? dispatch({ type: setCurrentPage, payload: 1 })
      : dispatch({ type: setCurrentPage, payload: currentPage + 1 });

  const prevPage = () =>
    currentPage === 1
      ? dispatch({ type: setCurrentPage, payload: 6 })
      : dispatch({ type: setCurrentPage, payload: currentPage - 1 });

  return (
    <div className="pagination-btn-container">
      <div className="pagination-btn-box">
        {pages?.map((page) => (
          <button
            className={`page-btn ${currentPage === page ? "page-active" : ""}`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              dispatch({ type: setCurrentPage, payload: page });
            }}
            key={page}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="nxt-prev-btn-box">
        <button
          className="nxt-prev-btn"
          disabled={currentPage === 1}
          title="Previous"
          onClick={prevPage}
        >
          <MdKeyboardDoubleArrowLeft />
        </button>
        <button
          className="nxt-prev-btn"
          disabled={currentPage === pages.length}
          title="Next"
          onClick={nextPage}
        >
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
