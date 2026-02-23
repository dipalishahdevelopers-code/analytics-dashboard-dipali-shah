import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt/auth";
import { PROFIT_DATA_BY_USER, REVENUE_DATA_BY_USER } from "@/constants/data";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.vEmail || !payload.vRole) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 },
      );
    }

    const email = payload.vEmail as string;
    const role = payload.vRole as string;

    if (role === "admin") {
      return NextResponse.json({
        success: true,
        data: {
          profit: PROFIT_DATA_BY_USER,
          revenue: REVENUE_DATA_BY_USER,
        },
      });
    }

    // Regular user data
    return NextResponse.json({
      success: true,
      data: {
        profit: PROFIT_DATA_BY_USER[email] || [],
        revenue: REVENUE_DATA_BY_USER[email] || [],
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
