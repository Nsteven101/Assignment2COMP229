import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { list, read, remove } from "./user";
import { useNavigate } from "react-router-dom";
import auth from "../../lib/auth-helper";

const Empty = () => (
  <Box
    sx={{
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography color="text.secondary">No accounts found</Typography>
  </Box>
);

export default function AccessAccounts() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const session = auth.isAuthenticated();
  const isAdmin = session?.user?.role === "admin";
  const currentUserId = session?.user?._id;

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const data = await list(controller.signal);
      const listArray = Array.isArray(data) ? data : [];

      setRows(
        listArray.map((u, i) => ({
          id: u._id ?? i,
          _id: u._id,
          name: u.name,
          email: u.email,
          role: u.role || "user",
        }))
      );
      setLoading(false);
    })();

    return () => controller.abort();
  }, []);

  const handleEdit = async (id) => {
    const res = await read({ userId: id }, { t: session.token });
    if (res?.error) return alert(res.error);

    navigate(`/editaccount/${id}`, { state: { user: res } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;
    const res = await remove({ userId: id }, { t: session.token });
    if (res?.error) return alert(res.error);

    setRows((prev) => prev.filter((r) => r._id !== id));

    // If user deleted themselves, log them out
    if (id === currentUserId) {
      auth.clearJWT(() => navigate("/signin"));
    }
  };

  const baseColumns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "role", headerName: "Role", width: 100 },
  ];

  const actionsColumn = {
    field: "actions",
    headerName: "Actions",
    width: 200,
    sortable: false,
    renderCell: ({ row }) => {
      const isSelf = row._id === currentUserId;
      const canEdit = isAdmin || isSelf;
      const canDelete = isAdmin || isSelf;

      return (
        <Box sx={{ display: "flex", gap: 1 }}>
          {canEdit && (
            <Button size="small" onClick={() => handleEdit(row._id)}>
              Edit
            </Button>
          )}
          {canDelete && (
            <Button
              size="small"
              color="error"
              onClick={() => handleDelete(row._id)}
            >
              Delete
            </Button>
          )}
        </Box>
      );
    },
  };

  const columns = [...baseColumns, actionsColumn];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        User Accounts
      </Typography>

      <Paper sx={{ height: 520, p: 2 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            getRowId={(row) => row._id}
            slots={{ noRowsOverlay: Empty }}
          />
        )}
      </Paper>
    </Box>
  );
}
