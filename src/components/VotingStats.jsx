import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import './VotingStats.css';

function VotingStats() {
  const { contract } = useWeb3();
  const [stats, setStats] = useState({
    totalVoters: 0,
    totalVotes: 0,
    votingProgress: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const totalVotes = await contract.methods.totalVotes().call();
        const candidateCount = await contract.methods.getCandidateCount().call();
        
        let totalVoters = 0;
        // This is a simplified way to count voters - you might want to optimize this
        const events = await contract.getPastEvents('VoterRegistered', {
          fromBlock: 0,
          toBlock: 'latest'
        });
        totalVoters = events.length;

        setStats({
          totalVoters,
          totalVotes,
          votingProgress: totalVoters > 0 ? (totalVotes / totalVoters) * 100 : 0
        });
      } catch (err) {
        console.error('Error loading stats:', err);
      }
    };

    if (contract) {
      loadStats();
    }
  }, [contract]);

  return (
    <div className="voting-stats">
      <h2>Voting Statistics</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <h3>Total Registered Voters</h3>
          <p>{stats.totalVoters}</p>
        </div>
        <div className="stat-item">
          <h3>Total Votes Cast</h3>
          <p>{stats.totalVotes}</p>
        </div>
        <div className="stat-item">
          <h3>Voting Progress</h3>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${stats.votingProgress}%` }}
            />
          </div>
          <p>{stats.votingProgress.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}

export default VotingStats; 