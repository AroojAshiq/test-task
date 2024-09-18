"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import TaskViewModal from "./TaskViewModal";

const TaskCard = ({ data, onDelete, onUpdate }) => {
  const [dropdown, setDropdown] = useState(false);
  const [id, SetId] = useState();
  const [showModal, setShowModal] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  useEffect(() => {
    SetId(localStorage.getItem("userId"));
  }, []);

  const deletetask = async (taskId) => {
    try {
      const res = await fetch(`${apiUrl}?userId=${id}&taskId=${taskId}`, {
        method: "DELETE",
      });
      if (res?.ok) {
        onDelete(id);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmit = async (status, taskId) => {
    let values;
    if (status === "completed") {
      values = { status: "pending", taskId: taskId };
    } else {
      values = { status: "completed", taskId: taskId };
    }

    try {
      const res = await fetch(`${apiUrl}?userId=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
        }),
      });

      if (res?.ok) {
        setDropdown(false);
        onUpdate(id);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="shadow-lg w-96 p-5 rounded-lg border-t-4 border-green-400">
      <div className="px-8 relative h-auto w-full">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          onClick={() => setDropdown(!dropdown)}
          className="inline-block absolute right-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>

        <div
          id="dropdown"
          onMouseLeave={() => setDropdown(false)}
          className={`z-40 ${
            dropdown ? "" : "hidden"
          } text-base absolute right-0 top-12 list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        >
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li
              onClick={() => setShowModal(true)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              View
            </li>
            <Link href={`/dashboard/edit-task/${data?._id}`}>
              <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Edit
              </li>
            </Link>
            <li
              onClick={() => onSubmit(data?.status, data?._id)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Marked as {data?.status === "completed" ? "Pending" : "Completed"}
            </li>
            <li
              onClick={() => deletetask(data?._id)}
              className="block cursor-pointer px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Delete
            </li>
          </ul>
        </div>
      </div>
      <div className="px-10 pt-2 space-y-4 pb-10">
        <div className="">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Tittle
          </h5>
          <h5 className="text-sm capitalize text-gray-500 dark:text-gray-400">
            {data?.title}
          </h5>
        </div>
        <div className="">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Status
          </h5>
          <h5 className="text-sm capitalize text-gray-500 dark:text-gray-400">
            {data?.status}
          </h5>
        </div>
        <div className="">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Due Date
          </h5>
          <h5 className="text-sm text-gray-500 dark:text-gray-400">
            {data?.dueDate}
          </h5>
        </div>
        <div className="">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Description
          </h5>
          <h5 className="text-sm text-gray-500 dark:text-gray-400">
            {data?.description}
          </h5>
        </div>
      </div>
      <TaskViewModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={data}
      />
    </div>
  );
};

export default TaskCard;
