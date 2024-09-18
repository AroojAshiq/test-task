import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages === 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center my-5">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === number ? "bg-green-400 text-white" : "bg-gray-200"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
