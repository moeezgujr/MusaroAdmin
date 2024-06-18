import React from "react";
import "./table.css";

const Pagination = ({

  currentPage,
  totalPages,
  onPageChange,

}) => {
  <div className="pagination">
    <>
      <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={index + 1 === currentPage ? "active" : ""}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </>
  </div>;
};

export default Pagination