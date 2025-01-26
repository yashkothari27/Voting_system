import { useState, useCallback } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

export const useVoting = () => {
  const { contract, account } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const castVote = useCallback(async (candidateId) => {
    setLoading(true);
    setError(null);
    try {
      const tx = await contract.methods.castVote(candidateId)
        .send({ from: account });
      return tx;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [contract, account]);

  return { castVote, loading, error };
}; 