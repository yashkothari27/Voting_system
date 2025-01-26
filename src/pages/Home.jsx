import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <h1>Secure Blockchain Voting System</h1>
      <p className="subtitle">
        Vote securely and transparently using blockchain technology
      </p>
      <div className="features">
        <div className="feature">
          <h3>Decentralized</h3>
          <p>Powered by Ethereum blockchain for maximum security</p>
        </div>
        <div className="feature">
          <h3>Transparent</h3>
          <p>All votes are publicly verifiable</p>
        </div>
        <div className="feature">
          <h3>Immutable</h3>
          <p>Votes cannot be altered once cast</p>
        </div>
      </div>
      <div className="cta-buttons">
        <Link to="/register" className="button">Register to Vote</Link>
        <Link to="/vote" className="button">Cast Your Vote</Link>
      </div>
    </div>
  )
}

export default Home 