import React from "react";

import "./Pagination.css";
import { useData } from "../../../../Contexts";
import { SET_PAGE } from "../../../../Utils/Constants";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "../../../../Utils/Icons/Icons";

const Pagination = () => {
  const {
    state: {
      productDetail: { currentPage, totalPage },
    },
    dispatch,
  } = useData();
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);

  const nextPage = () =>
    currentPage === 6
      ? dispatch({ type: SET_PAGE, payload: 1 })
      : dispatch({ type: SET_PAGE, payload: currentPage + 1 });

  const prevPage = () =>
    currentPage === 1
      ? dispatch({ type: SET_PAGE, payload: 6 })
      : dispatch({ type: SET_PAGE, payload: currentPage - 1 });

  return (
    <div className="pagination-btn-container">
      <div className="pagination-btn-box">
        {pages?.map((page) => (
          <button
            className={`page-btn ${currentPage === page ? "page-active" : ""}`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              dispatch({ type: SET_PAGE, payload: page });
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
