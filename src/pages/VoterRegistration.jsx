import React, { useState } from 'react'
import './VoterRegistration.css'

function VoterRegistration() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleRegister = () => {
    // Logic to register voter using blockchain
    console.log(`Registering voter: ${name}, ${email}`)
  }

  return (
    <div className="voter-registration">
      <h1>Voter Registration</h1>
      <div className="registration-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  )
}

export default VoterRegistration 