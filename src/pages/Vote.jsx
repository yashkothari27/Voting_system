import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { useVoting } from '../hooks/useVoting';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { VOTER_STATUS } from '../config/constants';
import './Vote.css';

function Vote() {
  const { contract, account } = useWeb3();
  const { castVote, loading: voteLoading, error: voteError } = useVoting();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [voterStatus, setVoterStatus] = useState(VOTER_STATUS.UNREGISTERED);
  const [remainingTime, setRemainingTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVotingInfo = async () => {
      if (!contract || !account) return;
      
      try {
        // Get voter info
        const voterInfo = await contract.methods.voters(account).call();
        const votingEndTime = await contract.methods.votingEndTime().call();
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (voterInfo.hasVoted) {
          setVoterStatus(VOTER_STATUS.VOTED);
        } else if (voterInfo.isRegistered) {
          setVoterStatus(VOTER_STATUS.REGISTERED);
        }
        
        if (votingEndTime > currentTime) {
          setRemainingTime(votingEndTime - currentTime);
        }
      } catch (err) {
        console.error('Error loading voting info:', err);
        setError('Failed to load voter information');
      }
    };

    loadVotingInfo();
  }, [contract, account]);

  useEffect(() => {
    const loadCandidates = async () => {
      if (!contract) return;
      
      try {
        const count = await contract.methods.getCandidateCount().call();
        const loadedCandidates = await Promise.all(
          Array.from({ length: parseInt(count) }, (_, i) => 
            contract.methods.getCandidate(i).call()
          )
        );
        
        setCandidates(loadedCandidates.map(c => ({
          id: c[0],
          name: c[1],
          voteCount: c[2]
        })));
      } catch (err) {
        console.error('Error loading candidates:', err);
        setError('Failed to load candidates');
      } finally {
        setLoading(false);
      }
    };
    
    loadCandidates();
  }, [contract]);

  const handleVote = async (e) => {
    e.preventDefault();
    if (!selectedCandidate) return;

    try {
      await castVote(selectedCandidate);
      setSelectedCandidate('');
      setVoterStatus(VOTER_STATUS.VOTED);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="vote">
      <h1>Cast Your Vote</h1>
      {voteError && <ErrorMessage message={voteError} />}
      
      {voterStatus === VOTER_STATUS.VOTED ? (
        <div className="message">You have already voted</div>
      ) : (
        <form className="vote-form" onSubmit={handleVote}>
          <label htmlFor="candidate">Select Candidate:</label>
          <select
            id="candidate"
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
            disabled={voteLoading || voterStatus !== VOTER_STATUS.REGISTERED}
          >
            <option value="">--Choose a candidate--</option>
            {candidates.map(candidate => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name}
              </option>
            ))}
          </select>
          <button 
            className="button" 
            type="submit"
            disabled={!selectedCandidate || voteLoading || voterStatus !== VOTER_STATUS.REGISTERED}
          >
            {voteLoading ? 'Submitting...' : 'Submit Vote'}
          </button>
        </form>
      )}
      
      {remainingTime && (
        <div className="time-remaining">
          Time remaining: {Math.floor(remainingTime / 60)} minutes
        </div>
      )}
    </div>
  );
}

export default Vote; 