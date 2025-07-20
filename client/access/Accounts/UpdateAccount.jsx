import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { read, update } from "./user";
import auth from "../../lib/auth-helper";

export default function UpdateAccount() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const session = auth.isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      let user = location.state?.user;

      if (!user) {
        const res = await read({ userId: id }, { t: session.token });
        if (res?.error) return setError(res.error);
        user = res;
      }

      setValues({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
      });
    };

    load();
  }, [id, location.state, session.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await update({ userId: id }, { t: session.token }, values);
    if (res?.error) return setError(res.error);

    navigate("/accessaccounts");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Update Account
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            sx={{ mb: 2 }}
            value={values.name}
            onChange={handleChange}
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            sx={{ mb: 2 }}
            value={values.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="role"
            label="Role"
            select
            fullWidth
            sx={{ mb: 3 }}
            value={values.role}
            onChange={handleChange}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          <Button variant="contained" type="submit">
            Save Changes
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
