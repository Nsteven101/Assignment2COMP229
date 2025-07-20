// AccessContact.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";

const Empty = () => (
  <Box
    sx={{
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography color="text.secondary">No records yet</Typography>
  </Box>
);

export default function AccessContact() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/contacts");
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];

        setRows(
          list.map((c, i) => ({
            id: c._id ?? i,
            name: `${c.firstname ?? ""} ${c.lastname ?? ""}`.trim(),
            email: c.email,
            contactNumber: c.contactNumber,
            message: c.message,
            date: c.createdAt
              ? new Date(c.createdAt).toLocaleDateString()
              : "",
          }))
        );
      } catch (err) {
        console.error(err);
        alert("Failed to load contacts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderList = () => (
    <List>
      {rows.map(row => {
        const initials = row.name
          .split(" ")
          .filter(Boolean)
          .map(word => word[0])
          .join("")
          .toUpperCase();

        return (
          <ListItem
            key={row.id}
            sx={{
              mb: 2,
              p: 2,
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
            }}
          >
            <Avatar sx={{ mr: 2 }}>{initials}</Avatar>

            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: 600 }}>{row.name}</Typography>
                  <Typography variant="caption" sx={{ ml: "auto" }}>
                    {row.date}
                  </Typography>
                </Box>
              }
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    {row.email} {row.contactNumber ? `· ${row.contactNumber}` : ""}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {row.message}
                  </Typography>
                </>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Contacts
      </Typography>

      <Paper sx={{ height: 520, p: 2, overflow: "auto" }}>
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
        ) : rows.length === 0 ? (
          <Empty />
        ) : (
          renderList()
        )}
      </Paper>
    </Box>
  );
}
