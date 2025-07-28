// apiProjects.js
const base = "/api/projects"

// builds common headers and adds auth when available
const getHeaders = () => {
  const headers = {
    Accept: "application/json",
    ["Content" + "\u002d" + "Type"]: "application/json"
  }

  if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem("jwt")
    if (stored) {
      const { token } = JSON.parse(stored)
      if (token) headers.Authorization = "Bearer " + token
    }
  }
  return headers
}

// helper to parse every reply
const parse = async response => {
  const data = await response.json()
  if (!response.ok) {
    return { error: data.error?.message || data.error || data.message || "Request failed" }
  }
  return data
}

// create new project
const createProject = async project => {
  try {
    const res = await fetch(base, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(project)
    })
    return await parse(res)
  } catch (err) {
    return { error: err.message }
  }
}

// list all projects
const listProjects = async () => {
  try {
    const res = await fetch(base, { headers: getHeaders() })
    return await parse(res)
  } catch (err) {
    return { error: err.message }
  }
}

// get single project by id
const getProject = async id => {
  try {
    const res = await fetch(`${base}/${id}`, { headers: getHeaders() })
    return await parse(res)
  } catch (err) {
    return { error: err.message }
  }
}

// update project
const updateProject = async (id, updates) => {
  try {
    const res = await fetch(`${base}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(updates)
    })
    return await parse(res)
  } catch (err) {
    return { error: err.message }
  }
}

// delete one project
const deleteProject = async id => {
  try {
    const res = await fetch(`${base}/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    })
    return await parse(res)
  } catch (err) {
    return { error: err.message }
  }
}

// delete every project
const deleteAllProjects = async () => {
  try {
    const res = await fetch(base, {
      method: "DELETE",
      headers: getHeaders()
    })
    return await parse(res)
  } catch (err) {
    return { error: err.message }
  }
}

export {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject,
  deleteAllProjects
}
