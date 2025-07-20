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
import { listProjects, getProject, deleteProject } from "./project";
import auth from "../../lib/auth-helper"; // import auth to check role

const Empty = () => (
  <Box
    sx={{
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography color="text.secondary">No projects yet</Typography>
  </Box>
);

export default function AccessProjects() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = auth.isAuthenticated()?.user?.role === "admin";
console.log("Session:", auth.isAuthenticated());
  useEffect(() => {
    (async () => {
      const data = await listProjects();
      const list = Array.isArray(data) ? data : [];
      setRows(
        list.map((p, i) => ({
          id: p._id ?? i,
          title: p.title,
          owner: `${p.firstname} ${p.lastname}`,
          email: p.email,
          completion: `${p.completion}%`,
          description: p.description,
        }))
      );
      setLoading(false);
    })();
  }, []);

  const handleEdit = async (id) => {
    const res = await getProject(id);
    if (res?.error) return alert(res.error);
    navigate(`/editproject/${id}`, { state: { project: res } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    const res = await deleteProject(id);
    if (res?.error) return alert(res.error);
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const baseColumns = [
    { field: "title", headerName: "Project", flex: 1 },
    { field: "owner", headerName: "Owner", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.2 },
    { field: "completion", headerName: "Done", width: 90 },
    { field: "description", headerName: "Description", flex: 2 },
  ];

  const adminActionsColumn = {
    field: "actions",
    headerName: "Actions",
    width: 180,
    sortable: false,
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", gap: 1, whiteSpace: "nowrap" }}>
        <Button size="small" onClick={() => handleEdit(row.id)}>
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </Button>
      </Box>
    ),
  };

  const columns = isAdmin ? [...baseColumns, adminActionsColumn] : baseColumns;

  console.log(isAdmin)
  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Projects
        </Typography>

        {isAdmin && (
          <Button variant="contained" component={RouterLink} to="/addproject">
            Add Project
          </Button>
        )}
      </Box>

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
            slots={{ noRowsOverlay: Empty }}
          />
        )}
      </Paper>
    </Box>
  );
}
