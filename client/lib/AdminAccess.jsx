// Admin.jsx (or AdminAccess.jsx)
import React from "react"
import { useNavigate } from "react-router-dom"
import headimg from "../src/assets/damn.jpg"
import auth from "./auth-helper.js"
import { signout } from "./api-auth.js"
import "./admin.css"

function Admin({ onSignOut = () => {} }) {     // default to a no-op
  const navigate = useNavigate()
  const session = auth.isAuthenticated()

  if (!session) {
    navigate("/signin")
    return null
  }

  const { user } = session

  const handleSignOut = async () => {
    await signout()
    onSignOut()                                // call the callback
    navigate("/signin")
  }

  return (
    <div className="adminContainer">
      <img src={headimg} alt="profile" className="adminImage" />
      <h1>Log In Success! Hello, {user.name}!</h1>
      <button className="signoutButton" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  )
}

export default Admin
