"use client";
import AllTasks from "@/components/allTasks/AllTasks";
import Navbar from "@/components/navbar/Navbar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function page() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      localStorage.setItem("userId", session?.user?._id);
    }
  }, []);

  return (
    <div className="py-10">
      <Navbar />
      <AllTasks id={session?.user?._id} />
    </div>
  );
}
