"use client";
import { useState, useEffect } from "react";
import TaskCard from "../global/TaskCard";
import Dropdown from "../global/DropDown";
import Link from "next/link";
import Pagination from "../global/Pagination";

const AllTasks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState({
    dueDate: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      getData(id);
    } else {
      setLoading(false);
    }
  }, [query]);

  const getData = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${apiUrl}?userId=${id}&sortDirection=${query?.dueDate}&status=${query?.status}`,
        {
          method: "GET",
        }
      );
      if (res?.ok) {
        const values = await res.json();
        setData(values);
      } else {
        setError("Failed to fetch tasks.");
      }
    } catch (error) {
      setError("Error fetching tasks: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div>
        <div className="flex justify-between px-10 my-10">
          <div>
            <Link href="/dashboard/task-form">
              <button className="text-base w-[120px] h-10 rounded-md text-white bg-green-400">
                Add Task
              </button>
            </Link>
          </div>

          <Dropdown query={query} setQuery={setQuery} />
        </div>
        {loading ? (
          <div className="h-[50vh] flex justify-center items-center">
            Loading tasks...
          </div>
        ) : (
          <>
            {paginatedData?.length === 0 ? (
              <div className="flex justify-center items-center h-[50vh]">
                No tasks available
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5 p-10">
                {paginatedData?.map((obj, _) => (
                  <div key={obj._id}>
                    <TaskCard
                      data={obj}
                      onDelete={getData}
                      onUpdate={getData}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div>
        <Pagination
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default AllTasks;
