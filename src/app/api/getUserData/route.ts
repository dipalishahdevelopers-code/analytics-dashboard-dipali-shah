import { NextResponse } from "next/server";
import { USERS_LIST } from "@/constants/data";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "";
    const sortDir = searchParams.get("sortDir") || "asc";
    const page = parseInt(searchParams.get("page") || "0");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    let filtered = USERS_LIST.map((u, i) => ({
      ...u,
      id: i + 1,
      status: "Active",
      lastLogin: new Date().toISOString(),
    })).filter(
      (u) =>
        (u.vFullName?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (u.vEmail?.toLowerCase() || "").includes(search.toLowerCase()),
    );

    if (sortBy) {
      filtered.sort((a: any, b: any) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        if (valA < valB) return sortDir === "asc" ? -1 : 1;
        if (valA > valB) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    const paginated = filtered.slice(page * pageSize, (page + 1) * pageSize);

    return NextResponse.json({
      success: true,
      data: paginated,
      total: filtered.length,
    });
  } catch (error) {
    console.error("Users API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
