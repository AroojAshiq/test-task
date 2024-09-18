import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/users";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ name, email, password: hashPassword });
    return NextResponse.json({ message: "user registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
