// apiEducations.js
const base = "/api/qualifications"

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

// create new education
const createEducation = async education => {
  try {
    const res = await fetch(base, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(education)
    })
    return await parse(res)
  } catch (err) {
    return { error: err.message }
  }
}

// list all educations
const listEducations = async () => {
  try {
    const res = await fetch(base, { headers: getHeaders() })
    return await parse(res)
  } catch (err) {
    return { error: err.message }
  }
}

// get single education by id
const getEducation = async id => {
  try {
    const res = await fetch(`${base}/${id}`, { headers: getHeaders() })
    return await parse(res)
  } catch (err) {
    return { error: err.message }
  }
}

// update education
const updateEducation = async (id, updates) => {
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

// delete one education
const deleteEducation = async id => {
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

// delete every education
const deleteAllEducations = async () => {
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
  createEducation,
  listEducations,
  getEducation,
  updateEducation,
  deleteEducation,
  deleteAllEducations
}
