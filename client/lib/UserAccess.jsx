// Admin.jsx (or AdminAccess.jsx)
import React from "react"
import { useNavigate } from "react-router-dom"
import headimg from "../src/assets/damn.jpg"
import auth from "./auth-helper.js"
import { signout } from "./api-auth.js"
import { Link } from "react\u002drouter\u002ddom";
import "./lib.css"

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

       <Link className="signupButton" to="/accessprojects">Projects</Link>
              <Link className="signupButton" to="/accesscontacts">View Messages</Link>
                     <Link className="signupButton" to="/accesseducation">Education</Link>
                            <Link className="signupButton" to="/accessaccounts">Access Accounts</Link>
      <button className="signoutButton" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  )
}

export default Admin
