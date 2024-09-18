"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const userExist = await fetch("api/userexits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await userExist.json();

      if (user) {
        setError("user already exists");
        setLoading(false);
        return;
      }
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res?.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("registeration failed");
      }
    } catch (error) {
      console.log("error during registeration", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg w-96 p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="w-full rounded-lg border outline-none border-gray-300  pl-2 h-10"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="w-full rounded-lg border outline-none border-gray-300 pl-2 h-10"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border outline-none border-gray-300  pl-2 h-10"
          />
          <button
            disabled={loading}
            className={`bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
