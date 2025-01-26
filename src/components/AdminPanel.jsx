import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ErrorMessage } from './common/ErrorMessage';
import './AdminPanel.css';

function AdminPanel() {
  const { contract, account } = useWeb3();
  const [voterAddress, setVoterAddress] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const registerVoter = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess('');

    try {
      await contract.methods.registerVoter(voterAddress)
        .send({ from: account });
      setVoterAddress('');
      setSuccess('Voter registered successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCandidate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess('');

    try {
      await contract.methods.addCandidate(candidateName)
        .send({ from: account });
      setCandidateName('');
      setSuccess('Candidate added successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      {error && <ErrorMessage message={error} />}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={registerVoter} className="admin-form">
        <h3>Register Voter</h3>
        <input
          type="text"
          value={voterAddress}
          onChange={(e) => setVoterAddress(e.target.value)}
          placeholder="Voter Address"
          required
        />
        <button type="submit" disabled={loading}>Register Voter</button>
      </form>

      <form onSubmit={addCandidate} className="admin-form">
        <h3>Add Candidate</h3>
        <input
          type="text"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          placeholder="Candidate Name"
          required
        />
        <button type="submit" disabled={loading}>Add Candidate</button>
      </form>
    </div>
  );
}

export default AdminPanel; 