import { IUserState } from "@/store/types/authentication";
import {
  SalesDataByUser,
  ProfitDataByUser,
  RevenueDataByUser,
} from "@/store/types/dashboard";

export const USERS_LIST: IUserState[] = [
  {
    vRole: "admin",
    vEmail: "admin@mail.com",
    vPassword: "Demo@123",
    vFullName: "Admin",
  },
  {
    vRole: "user",
    vEmail: "user1@mail.com",
    vPassword: "Demo@123",
    vFullName: "John Doe (User 1)",
  },
  {
    vRole: "user",
    vEmail: "user2@mail.com",
    vPassword: "Demo@123",
    vFullName: "Jane Smith (User 2)",
  },
  {
    vRole: "user",
    vEmail: "user3@mail.com",
    vPassword: "Demo@123",
    vFullName: "Bob Wilson (User 3)",
  },
  ...Array.from({ length: 50 }, (_, i) => ({
    vRole: "user",
    vEmail: `user${i + 4}@mail.com`,
    vPassword: "Demo@123",
    vFullName: `User ${i + 4}`,
  })),
];

export const SALES_DATA_BY_USER: SalesDataByUser = {
  "user1@mail.com": [
    { name: "Jan", sales: 1200 },
    { name: "Feb", sales: 2100 },
    { name: "Mar", sales: 800 },
    { name: "Apr", sales: 1600 },
    { name: "May", sales: 900 },
    { name: "Jun", sales: 1700 },
  ],
  "user2@mail.com": [
    { name: "Jan", sales: 3000 },
    { name: "Feb", sales: 2800 },
    { name: "Mar", sales: 3500 },
    { name: "Apr", sales: 2400 },
    { name: "May", sales: 3200 },
    { name: "Jun", sales: 2900 },
  ],
  "user3@mail.com": [
    { name: "Jan", sales: 500 },
    { name: "Feb", sales: 1500 },
    { name: "Mar", sales: 1000 },
    { name: "Apr", sales: 2000 },
    { name: "May", sales: 2500 },
    { name: "Jun", sales: 3000 },
  ],
};

export const PROFIT_DATA_BY_USER: ProfitDataByUser = {
  "user1@mail.com": [
    { name: "Jan", profit: 450 },
    { name: "Feb", profit: 780 },
    { name: "Mar", profit: 320 },
    { name: "Apr", profit: 610 },
    { name: "May", profit: 350 },
    { name: "Jun", profit: 640 },
  ],
  "user2@mail.com": [
    { name: "Jan", profit: 1200 },
    { name: "Feb", profit: 1100 },
    { name: "Mar", profit: 1400 },
    { name: "Apr", profit: 950 },
    { name: "May", profit: 1300 },
    { name: "Jun", profit: 1150 },
  ],
  "user3@mail.com": [
    { name: "Jan", profit: 200 },
    { name: "Feb", profit: 550 },
    { name: "Mar", profit: 400 },
    { name: "Apr", profit: 750 },
    { name: "May", profit: 900 },
    { name: "Jun", profit: 1100 },
  ],
};

export const REVENUE_DATA_BY_USER: RevenueDataByUser = {
  "user1@mail.com": [
    { month: "Jan", revenue: 1200, profit: 450 },
    { month: "Feb", revenue: 2100, profit: 780 },
    { month: "Mar", revenue: 800, profit: 320 },
    { month: "Apr", revenue: 1600, profit: 610 },
    { month: "May", revenue: 900, profit: 350 },
    { month: "Jun", revenue: 1700, profit: 640 },
  ],
  "user2@mail.com": [
    { month: "Jan", revenue: 3000, profit: 1200 },
    { month: "Feb", revenue: 2800, profit: 1100 },
    { month: "Mar", revenue: 3500, profit: 1400 },
    { month: "Apr", revenue: 2400, profit: 950 },
    { month: "May", revenue: 3200, profit: 1300 },
    { month: "Jun", revenue: 2900, profit: 1150 },
  ],
  "user3@mail.com": [
    { month: "Jan", revenue: 500, profit: 200 },
    { month: "Feb", revenue: 1500, profit: 550 },
    { month: "Mar", revenue: 1000, profit: 400 },
    { month: "Apr", revenue: 2000, profit: 750 },
    { month: "May", revenue: 2500, profit: 900 },
    { month: "Jun", revenue: 3000, profit: 1100 },
  ],
};
