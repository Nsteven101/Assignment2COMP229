// admin/projects/UpdateProject.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getProject, updateProject } from "./project";

export default function UpdateProject() {
  const { id }         = useParams();                 // /editproject/:id
  const navigate       = useNavigate();
  const { state }      = useLocation();               // may contain { project }
  const [item, setItem] = useState(
    state?.project ?? {
      title:        "",
      firstname:    "",
      lastname:     "",
      email:        "",
      completion:   "",
      description:  "",
    }
  );
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState(null);

  /* fetch if not passed from AccessProjects */
  useEffect(() => {
    if (state?.project) return;
    (async () => {
      const res = await getProject(id);
      if (res?.error) { alert(res.error); return; }
      setItem(res);
    })();
  }, [id, state]);

  const change = key => e => setItem(v => ({ ...v, [key]: e.target.value }));

  const save = async e => {
    e.preventDefault();
    setBusy(true);
    setNote(null);

    const res = await updateProject(id, {
      title:       item.title,
      firstname:   item.firstname,
      lastname:    item.lastname,
      email:       item.email,
      completion:  item.completion,
      description: item.description,
    });

    if (res?.error) setNote({ ok: false, text: res.error });
    else {
      setNote({ ok: true, text: "Changes saved" });
      setTimeout(() => navigate("/projects"), 3000);
    }
    setBusy(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Edit Project
        </Typography>

        <form onSubmit={save}>
          {[
            ["title",     "Title"],
            ["firstname", "First Name"],
            ["lastname",  "Last Name"],
            ["email",     "Email", "email"],
          ].map(([k, label, type]) => (
            <TextField
              key={k}
              label={label}
              type={type || "text"}
              fullWidth
              margin="normal"
              value={item[k] || ""}
              onChange={change(k)}
              required
            />
          ))}

          <TextField
            label="Completion Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={item.completion || ""}
            onChange={change("completion")}
            required
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={item.description || ""}
            onChange={change("description")}
          />

          <Button
            variant="contained"
            type="submit"
            disabled={busy}
            sx={{ mt: 2 }}
          >
            {busy ? "Saving…" : "Save Changes"}
          </Button>
        </form>

        {note && (
          <Typography
            sx={{ mt: 2 }}
            color={note.ok ? "success.main" : "error.main"}
          >
            {note.text}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
