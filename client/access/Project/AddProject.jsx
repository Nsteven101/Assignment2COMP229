// AddProject.jsx
import React, { useState } from "react"
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { createProject } from "./project"

export default function AddProject() {
  const nav = useNavigate()
  const [data, setData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    completion: "",
    description: "",
  })
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)

  const change = key => e => setData(v => ({ ...v, [key]: e.target.value }))

  const save = async e => {
    e.preventDefault()
    setBusy(true)
    setMsg(null)

    const res = await createProject({
      title: data.title,
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      completion: data.completion,
      description: data.description,
    })

    if (res?.error) setMsg({ ok: false, text: res.error })
    else {
      setMsg({ ok: true, text: "Saved" })
      setData({
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        completion: "",
        description: "",
      })
      setTimeout(() => nav("/admin"), 15000)
    }
    setBusy(false)
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Add Project
        </Typography>

        <form onSubmit={save}>
          {["title", "firstName", "lastName", "email"].map(k => (
            <TextField
              key={k}
              label={
                k === "title"
                  ? "Title"
                  : k === "firstName"
                  ? "First Name"
                  : k === "lastName"
                  ? "Last Name"
                  : "Email"
              }
              type={k === "email" ? "email" : "text"}
              fullWidth
              margin="normal"
              value={data[k]}
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
            value={data.completion}
            onChange={change("completion")}
            required
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={data.description}
            onChange={change("description")}
          />

          <Button
            variant="contained"
            type="submit"
            disabled={busy}
            sx={{ mt: 2 }}
          >
            {busy ? "Saving..." : "Save"}
          </Button>
        </form>

        {msg && (
          <Typography
            sx={{ mt: 2 }}
            color={msg.ok ? "success.main" : "error.main"}
          >
            {msg.text}
          </Typography>
        )}
      </Paper>
    </Box>
  )
}
