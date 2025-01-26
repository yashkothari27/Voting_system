import React, { createContext, useContext, useState, useEffect } from 'react';
import { initWeb3, initContract } from '../utils/web3';
import { CONTRACT_ADDRESS, NETWORKS } from '../config/constants';

const Web3Context = createContext(null);

export function Web3Provider({ children }) {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        if (!CONTRACT_ADDRESS) {
          throw new Error('Contract address not configured');
        }

        const web3Instance = await initWeb3();
        const accounts = await web3Instance.eth.getAccounts();
        
        if (!accounts || accounts.length === 0) {
          throw new Error('No accounts found. Please connect your wallet.');
        }

        const contractInstance = await initContract(CONTRACT_ADDRESS);
        
        // Verify contract has required methods
        if (!contractInstance.methods.voters || !contractInstance.methods.getCandidate) {
          throw new Error('Contract missing required methods');
        }

        setWeb3(web3Instance);
        setContract(contractInstance);
        setAccount(accounts[0]);
        
        // Listen for account changes
        window.ethereum?.on('accountsChanged', (accounts) => {
          setAccount(accounts[0]);
        });

        // Listen for chain changes
        window.ethereum?.on('chainChanged', () => {
          window.location.reload();
        });
        
      } catch (err) {
        setError(err.message);
        console.error('Failed to initialize Web3:', err);
      } finally {
        setLoading(false);
      }
    };

    init();

    // Cleanup listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  if (loading) {
    return <div>Loading Web3...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Web3Context.Provider value={{ web3, contract, account, loading, error }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
} 