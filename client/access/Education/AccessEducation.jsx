import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  listEducations,
  getEducation,
  deleteEducation,
} from "./education";
import auth from "../../lib/auth-helper";  // ✅ import auth

const Empty = () => (
  <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Typography color="text.secondary">No records yet</Typography>
  </Box>
);

export default function AccessEducation() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = auth.isAuthenticated()?.user?.role === "admin";

  useEffect(() => {
    (async () => {
      const data = await listEducations();
      const list = Array.isArray(data) ? data : [];
      setRows(
        list.map((e, i) => ({
          id: e._id ?? i,
          title: e.title,
          name: `${e.firstname} ${e.lastname}`,
          email: e.email,
          completion: new Date(e.completion).toLocaleDateString(),
          description: e.description,
        }))
      );
      setLoading(false);
    })();
  }, []);

  const handleEdit = async id => {
    const res = await getEducation(id);
    if (res?.error) return alert(res.error);
    navigate(`/editeducation/${id}`, { state: { education: res } });
  };

  const handleDelete = async id => {
    if (!window.confirm("Delete this record?")) return;
    const res = await deleteEducation(id);
    if (res?.error) return alert(res.error);
    setRows(prev => prev.filter(r => r.id !== id));
  };

  const baseColumns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "name", headerName: "Name", flex: 1.2 },
    { field: "email", headerName: "Email", flex: 1.2 },
    { field: "completion", headerName: "Completion", width: 110 },
    { field: "description", headerName: "Description", flex: 2 },
  ];

  const adminActionsColumn = {
    field: "actions",
    headerName: "Actions",
    width: 160,
    sortable: false,
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", gap: 1, whiteSpace: "nowrap" }}>
        <Button size="small" onClick={() => handleEdit(row.id)}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={() => handleDelete(row.id)}>
          Delete
        </Button>
      </Box>
    ),
  };

  const columns = isAdmin ? [...baseColumns, adminActionsColumn] : baseColumns;

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Education
        </Typography>

        {isAdmin && (
          <Button variant="contained" component={RouterLink} to="/addeducation">
            Add Education
          </Button>
        )}
      </Box>

      <Paper sx={{ height: 520, p: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            slots={{ noRowsOverlay: Empty }}
          />
        )}
      </Paper>
    </Box>
  );
}
