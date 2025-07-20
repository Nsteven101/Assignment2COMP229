// components/AdminButton.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import headimg from '../src/assets/damn.jpg'
import auth from './auth-helper.js'
import './lib.css';

function AdminButton () {
  const session = auth.isAuthenticated()
  if (!session) return null

  const { user } = session

  return (
    <Link to="/admin" className="adminButton">
      <img
        src={headimg}
        alt={user?.name || 'Admin'}
        className="adminAvatar"
      />
    </Link>
  )
}

export default AdminButton
