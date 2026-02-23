import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("token");
  response.cookies.delete("vRole");
  response.cookies.delete("vEmail");
  return response;
}
