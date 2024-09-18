"use client";
import { useState } from "react";

export default function Dropdown({ setQuery, query }) {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <div className="relative w-full text-left">
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex justify-center w-auto absolute right-40 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 "
        >
          Filter Status
        </button>

        {open && (
          <div
            onMouseLeave={() => setOpen(false)}
            className="origin-top-right top-8 z-20 absolute right-44 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <ul className="py-1">
              <li
                onClick={() => setQuery({ ...query, status: "pending" })}
                className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
              >
                Pending
              </li>
              <li
                onClick={() => setQuery({ ...query, status: "completed" })}
                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Completed
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="relative w-full text-left">
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-auto absolute right-0 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 "
        >
          Sort By Due Date
        </button>

        {isOpen && (
          <div
            onMouseLeave={() => setIsOpen(false)}
            className="origin-top-right top-8 z-20 absolute right-8 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <ul className="py-1">
              <li
                onClick={() => setQuery({ ...query, dueDate: "asc" })}
                className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
              >
                Acesnding
              </li>
              <li
                onClick={() => setQuery({ ...query, dueDate: "desc" })}
                className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
              >
                Descending
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
