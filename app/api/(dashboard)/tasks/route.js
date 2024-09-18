import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Task from "@/models/tasks";
import { Types } from "mongoose";
import User from "@/models/users";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");
    const sortDirection = searchParams.get("sortDirection") || "asc"; // Default to ascending
    const status = searchParams.get("status");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    await connectMongoDB();

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Create a query object to filter tasks
    let query = { user: new Types.ObjectId(userId) };

    // If status is provided, filter tasks by status
    if (status) {
      query.status = status;
    }

    // Determine the sort order based on the `sortDirection` parameter
    const sortOrder = sortDirection === "desc" ? -1 : 1;

    // Fetch tasks with the applied filters and sort them by dueDate in the specified order
    const tasks = await Task.find(query).sort({ dueDate: sortOrder });

    return new NextResponse(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching tasks: " + error, {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const body = await request.json();

    const { title, description, status, dueDate } = body;

    // Debug incoming data
    console.log("Received data:", {
      title,
      description,
      status,
      dueDate,
      userId,
    });

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    if (!title || !description || !status || !dueDate) {
      return new NextResponse(
        JSON.stringify({ message: "Missing required fields" }),
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

    // Create new task
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      user: new Types.ObjectId(userId),
    });

    // Debug task before saving
    console.log("Task to be saved:", newTask);

    // Save task and confirm result
    const savedTask = await newTask.save();
    console.log("Saved task:", savedTask);

    return new NextResponse(
      JSON.stringify({ message: "Task created", task: savedTask }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating task",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};

export const PATCH = async (request) => {
  try {
    const body = await request.json();
    const { taskId, title, description, status, dueDate } = body;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!taskId || !Types.ObjectId.isValid(taskId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing taskId" }),
        { status: 400 }
      );
    }

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
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

    // Find the task and ensure it belongs to the user
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      return new NextResponse(
        JSON.stringify({
          message: "Task not found or does not belong to the user",
        }),
        {
          status: 404,
        }
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status, dueDate },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({ message: "Task updated", task: updatedTask }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in updating task",
        error,
      }),
      { status: 500 }
    );
  }
};

export const DELETE = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("taskId");
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    if (!taskId || !Types.ObjectId.isValid(taskId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing taskId" }),
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

    // Check if the task exists and belongs to the user
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      return new NextResponse(
        JSON.stringify({
          message: "Task not found or does not belong to the user",
        }),
        {
          status: 404,
        }
      );
    }

    await Task.findByIdAndDelete(taskId);

    return new NextResponse(
      JSON.stringify({ message: "Task deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in deleting task",
        error,
      }),
      { status: 500 }
    );
  }
};
