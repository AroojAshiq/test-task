import React, { useState, useEffect } from "react";

export default function TaskViewModal({ showModal, setShowModal, data }) {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center hide-scrollbar overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative max-w-[538px] my-6 mx-auto px-5">
              {/*content*/}
              <div className="border-0 shadow-lg p-5 rounded-lg border-t-8 border-green-400 relative flex flex-col w-full bg-white outline-none focus:outline-none pb-5">
                {/*header*/}

                {/*body*/}
                <div className="">
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
                </div>
                <div className="flex w-full items-end justify-end p-5">
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-base w-[120px] h-10 rounded-md text-white bg-red-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
