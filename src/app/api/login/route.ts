import { NextResponse } from "next/server";
import { generateToken } from "@/lib/jwt/auth";
import { USERS_LIST } from "@/constants/data";

export async function POST(req: Request) {
  try {
    const { vEmail, vPassword } = await req.json();

    const user = USERS_LIST.find((user) => user.vEmail === vEmail);

    if (!user || user.vPassword !== vPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = await generateToken({ vEmail, vRole: user.vRole });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: { vEmail: user.vEmail, vRole: user.vRole },
      token,
    });

    // Set cookies
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    response.cookies.set("vRole", user.vRole || "", {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set("vEmail", user.vEmail || "", {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
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
