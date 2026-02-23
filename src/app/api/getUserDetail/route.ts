import { NextResponse } from "next/server";
import { USERS_LIST } from "@/constants/data";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cookieStore = cookies(); // ✅ no await
    const vEmail = (await cookieStore).get("vEmail")?.value;
    const user = USERS_LIST.find((user) => user.vEmail === vEmail);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: user,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
