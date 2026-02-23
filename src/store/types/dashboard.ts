import { IUserState } from "./authentication";

// Dashboard Data Types
export interface SalesData {
  name: string;
  sales: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  profit: number;
}

export interface SalesDataByUser {
  [key: string]: SalesData[];
}

export interface ProfitData {
  name: string;
  profit: number;
}

export interface ProfitDataByUser {
  [key: string]: ProfitData[];
}

export interface RevenueDataByUser {
  [key: string]: RevenueData[];
}

export interface UserStats extends IUserState {
  id: number;
  status: "Active" | "Inactive";
  lastLogin: string;
}

// Redux State Types
export interface DashboardState {
  sales: SalesData[];
  revenue: RevenueData[];
  users: {
    data: UserStats[];
    total: number;
    loading: boolean;
    page: number;
    pageSize: number;
    search: string;
    sortBy: string;
    sortDir: "asc" | "desc";
  };
  loading: boolean;
  error: string | null;
}
