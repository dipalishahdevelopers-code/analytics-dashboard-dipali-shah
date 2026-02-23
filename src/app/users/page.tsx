"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Paper,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setUsersPage,
  setUsersSearch,
  setUsersSort,
} from "@/store/slices/userSlice";
import { GetUser } from "@/store/actions/userActions";

const columns: GridColDef[] = [
  { field: "vFullName", headerName: "Full Name", flex: 1 },
  { field: "vEmail", headerName: "Email", flex: 1 },
  { field: "vRole", headerName: "vRole", width: 120 },
];

const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, total, loading, page, pageSize, search, sortBy, sortDir } =
    useAppSelector((state) => state.user);
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    dispatch(GetUser({ search, sortBy, sortDir, page, pageSize }));
  }, [dispatch, search, sortBy, sortDir, page, pageSize]);

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    dispatch(setUsersPage(model.page));
  };

  const handleSortModelChange = (model: GridSortModel) => {
    if (model.length > 0) {
      dispatch(
        setUsersSort({
          sortBy: model[0].field,
          sortDir: model[0].sort as "asc" | "desc",
        }),
      );
    } else {
      dispatch(
        setUsersSort({
          sortBy: "",
          sortDir: "asc",
        }),
      );
    }
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(setUsersSearch(searchInput));
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          User Management
        </Typography>
        <Typography color="text.secondary">
          Manage system users, Roles, and access levels.
        </Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 3, boxShadow: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users by name or email (Press Enter)..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearch}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{ maxWidth: 500 }}
        />
      </Paper>

      <Paper sx={{ height: 600, width: "100%", boxShadow: 2 }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          rowCount={total}
          loading={loading}
          paginationMode="server"
          sortingMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={handlePaginationModelChange}
          onSortModelChange={handleSortModelChange}
          getRowId={(row) => row.vEmail} // Using vEmail as unique ID if token/iUserId is missing
          disableRowSelectionOnClick
          sx={{ border: 0 }}
        />
      </Paper>
    </DashboardLayout>
  );
};

export default UsersPage;
