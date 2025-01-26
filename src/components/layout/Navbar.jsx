import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3 } from '../../contexts/Web3Context';
import './Navbar.css';

function Navbar() {
  const { account, connectWallet } = useWeb3();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🗳️</span>
          <span className="logo-text">BlockVote</span>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/vote" 
            className={`nav-link ${location.pathname === '/vote' ? 'active' : ''}`}
          >
            Vote
          </Link>
          <Link 
            to="/results" 
            className={`nav-link ${location.pathname === '/results' ? 'active' : ''}`}
          >
            Results
          </Link>
          
          {account ? (
            <div className="wallet-info">
              <span className="wallet-address">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            </div>
          ) : (
            <button className="connect-wallet" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 