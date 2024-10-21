import { NextRequest, NextResponse } from "next/server";
import { createToken } from "../../../utils/jwt";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "password") {
    // Generate a JWT token
    const token = createToken({ username });
    return NextResponse.json({ token });
  } else {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }
}
