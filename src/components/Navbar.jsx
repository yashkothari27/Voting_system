import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Blockchain Voting
        </Link>
        <div className="nav-links">
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/vote" className="nav-link">Vote</Link>
          <Link to="/results" className="nav-link">Results</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 