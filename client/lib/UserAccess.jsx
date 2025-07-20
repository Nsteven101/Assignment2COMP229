import React from "react";
import { useNavigate } from "react-router-dom";
import headimg from "../src/assets/damn.jpg";
import auth from "./auth-helper.js";
import { signout } from "./api-auth.js";
import { Link } from "react-router-dom";
import "./lib.css";

function Admin({ onSignOut = () => {} }) {
  const navigate = useNavigate();
  const session = auth.isAuthenticated();

  if (!session) {
    navigate("/signin");
    return null;
  }

  const { user } = session;

  const handleSignOut = async () => {
    await signout();
    onSignOut();
    navigate("/signin");
  };

  return (
    <div className="adminContainer">
      <img src={headimg} alt="profile" className="adminImage" />
      <h1 className="adminGreeting">Log In Success! Hello, {user.name}!</h1>

      <div className="adminNav">
        <Link className="adminNavButton" to="/accessprojects">Projects</Link>
        <Link className="adminNavButton" to="/accesscontacts">Contacts</Link>
        <Link className="adminNavButton" to="/accesseducation">Education</Link>
        <Link className="adminNavButton" to="/accessaccounts">Access Accounts</Link>
      </div>

      <button className="signoutButton" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default Admin;
