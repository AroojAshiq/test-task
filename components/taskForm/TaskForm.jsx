"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string()
    .max(50, "Title should not exceed 50 characters")
    .required("Title is required"),
  description: Yup.string()
    .max(500, "Description should not exceed 500 characters")
    .required("Description is required"),
  dueDate: Yup.date()
    .nullable()
    .required("Due date is required")
    .typeError("Invalid date format"),
  status: Yup.string()
    .oneOf(["completed", "pending"], "Invalid status")
    .required("Status is required"),
});

const TaskForm = () => {
  const initialValues = {
    title: "",
    description: "",
    dueDate: "",
    status: "",
  };
  const [id, setId] = useState();
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  useEffect(() => {
    setId(localStorage.getItem("userId"));
  }, []);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await fetch(`${apiUrl}/?userId=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
        }),
      });
      if (res?.ok) {
        router.replace("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      // Enable the submit button after the request is complete
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex pt-5 justify-start space-x-2 items-center px-10">
        <Link href="/dashboard">
          <div className="flex justify-start space-x-2 items-center">
            <img src="/left-arrow.svg" className="h-5 w-5" alt="" />
            <p>Back</p>
          </div>
        </Link>
      </div>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold text-center mb-6">Create Task</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {/* Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.title && touched.title ? "border-red-500" : ""
                  }`}
                  placeholder="Enter task title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={3}
                  className={`shadow appearance-none resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.description && touched.description
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter task description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Due Date */}
              <div className="mb-4">
                <label
                  htmlFor="dueDate"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Due Date
                </label>
                <Field
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.dueDate && touched.dueDate ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Status (Radio) */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </label>
                <div className="flex items-center mb-2">
                  <Field
                    type="radio"
                    id="completed"
                    name="status"
                    value="completed"
                    className="mr-2"
                  />
                  <label htmlFor="completed" className="text-gray-700">
                    Completed
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <Field
                    type="radio"
                    id="pending"
                    name="status"
                    value="pending"
                    className="mr-2"
                  />
                  <label htmlFor="pending" className="text-gray-700">
                    Pending
                  </label>
                </div>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting} // Disable while submitting
                  className={`${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-700"
                  } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskForm;
