"use client";

import React from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: number;
    trendLabel?: string;
    trendType?: "up" | "down";
    color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendLabel, trendType, color = "primary.main" }) => {
    return (
        <Card sx={{ height: "100%", boxShadow: 2 }}>
            <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                        <Typography color="text.secondary" variant="overline" sx={{ fontWeight: "bold" }}>
                            {title}
                        </Typography>
                        <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
                            {value}
                        </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: color, boxShadow: 2 }}>{icon}</Avatar>
                </Box>
                {trend !== undefined && (
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            color: trendType === "up" ? "success.main" : "error.main",
                            mr: 1
                        }}>
                            {trendType === "up" ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
                            <Typography variant="body2" sx={{ ml: 0.5, fontWeight: "bold" }}>
                                {trend}%
                            </Typography>
                        </Box>
                        <Typography color="text.secondary" variant="body2">
                            {trendLabel}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default StatCard;
