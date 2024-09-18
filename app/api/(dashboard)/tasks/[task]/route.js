import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Task from "@/models/tasks";
import { Types } from "mongoose";
import User from "@/models/users";

export const GET = async (request, context) => {
  const taskId = context.params.task;
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    if (!taskId || !Types.ObjectId.isValid(taskId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing task ID" }),
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Fetch the task and ensure it belongs to the user
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      return new NextResponse(
        JSON.stringify({
          message: "Task not found or does not belong to the user",
        }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching task " + error, {
      status: 500,
    });
  }
};
