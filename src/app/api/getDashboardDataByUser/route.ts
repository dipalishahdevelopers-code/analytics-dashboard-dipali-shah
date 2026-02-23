import { NextResponse } from "next/server";
import {
  SALES_DATA_BY_USER,
  REVENUE_DATA_BY_USER,
  PROFIT_DATA_BY_USER,
} from "@/constants/data";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies(); // ✅ no await
    const vEmail = (await cookieStore).get("vEmail")?.value;
    const vRole = (await cookieStore).get("vRole")?.value;

    if (!vEmail || !vRole) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Missing credentials" },
        { status: 401 },
      );
    }

    if (vRole === "admin") {
      const aggregatedRevenue: Record<
        string,
        { month: string; revenue: number; profit: number }
      > = {};
      Object.values(REVENUE_DATA_BY_USER).forEach((userData) => {
        userData.forEach(({ month, revenue, profit }) => {
          if (!aggregatedRevenue[month]) {
            aggregatedRevenue[month] = { month, revenue: 0, profit: 0 };
          }
          aggregatedRevenue[month].revenue += revenue;
          aggregatedRevenue[month].profit += profit;
        });
      });
      const revenueArray = Object.values(aggregatedRevenue); // Aggregate Profit
      const aggregatedProfit: Record<string, { name: string; profit: number }> =
        {};
      Object.values(PROFIT_DATA_BY_USER).forEach((userData) => {
        userData.forEach(({ name, profit }) => {
          if (!aggregatedProfit[name]) {
            aggregatedProfit[name] = { name, profit: 0 };
          }
          aggregatedProfit[name].profit += profit;
        });
      });
      const profitArray = Object.values(aggregatedProfit);
      const aggregatedSales: Record<string, { name: string; sales: number }> =
        {};
      Object.values(SALES_DATA_BY_USER).forEach((userData) => {
        userData.forEach(({ name, sales }) => {
          if (!aggregatedSales[name]) {
            aggregatedSales[name] = { name, sales: 0 };
          }
          aggregatedSales[name].sales += sales;
        });
      });
      const salesArray = Object.values(aggregatedSales);

      return NextResponse.json({
        success: true,
        data: {
          REVENUE_DATA_BY_USER: revenueArray,
          PROFIT_DATA_BY_USER: profitArray,
          SALES_DATA_BY_USER: salesArray,
        },
      });
    } else {
      // User role → merge their own data
      const userSales = SALES_DATA_BY_USER[vEmail] || [];
      const userRevenue = REVENUE_DATA_BY_USER[vEmail] || [];
      const userProfit = PROFIT_DATA_BY_USER[vEmail] || [];

      return NextResponse.json({
        success: true,
        data: {
          REVENUE_DATA_BY_USER: userRevenue,
          PROFIT_DATA_BY_USER: userProfit,
          SALES_DATA_BY_USER: userSales,
        },
      });
    }
  } catch (error) {
    console.error("Get merged data error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
