"use client";

import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getDashboardDataByUser } from "@/store/actions/dashboardAction";
import { GetUser, GetUserDetail } from "@/store/actions/userActions";

const AnalyticsCharts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sales, revenue } = useAppSelector((state) => state.dashboard);

  React.useEffect(() => {
    dispatch(getDashboardDataByUser());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(GetUser({}));
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(GetUserDetail());
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      {/* Sales Trend - Area Chart */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Sales Trend
            </Typography>
            <Box sx={{ height: 300, width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sales}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#1976d2"
                    fillOpacity={1}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Revenue & Profit - Bar Chart */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Revenue vs Profit
            </Typography>
            <Box sx={{ height: 300, width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenue}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#1976d2" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" fill="#4caf50" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AnalyticsCharts;
