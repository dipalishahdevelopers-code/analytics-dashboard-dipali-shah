import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Grid, Typography, Box } from "@mui/material";
import StatCard from "@/components/dashboard/StatCard";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Overview
        </Typography>
        <Typography color="text.secondary">
          Welcome back! Here's what's happening today.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Revenue"
            value="$45,231"
            icon={<AttachMoneyIcon />}
            trend={12.5}
            trendLabel="from last month"
            trendType="up"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Users"
            value="2,345"
            icon={<PeopleIcon />}
            trend={5.2}
            trendLabel="from last week"
            trendType="up"
            color="secondary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Sales"
            value="1,203"
            icon={<ShoppingCartIcon />}
            trend={2.4}
            trendLabel="from yesterday"
            trendType="down"
            color="success.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Conversion Rate"
            value="3.24%"
            icon={<TrendingUpIcon />}
            trend={0.8}
            trendLabel="from last month"
            trendType="up"
            color="warning.main"
          />
        </Grid>
      </Grid>

      <AnalyticsCharts />
    </DashboardLayout>
  );
};

export default DashboardPage;
