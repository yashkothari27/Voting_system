import React from 'react'
import './Results.css'

function Results() {
  // Placeholder data
  const results = [
    { candidate: 'Candidate 1', votes: 120 },
    { candidate: 'Candidate 2', votes: 150 },
    { candidate: 'Candidate 3', votes: 90 },
  ]

  return (
    <div className="results">
      <h1>Election Results</h1>
      <ul className="results-list">
        {results.map((result, index) => (
          <li key={index} className="result-item">
            {result.candidate}: {result.votes} votes
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Results 