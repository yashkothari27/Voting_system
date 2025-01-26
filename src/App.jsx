import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './contexts/Web3Context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vote from './pages/Vote';
import Results from './pages/Results';
import VoterRegistration from './pages/VoterRegistration';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vote" element={<Vote />} />
              <Route path="/register" element={<VoterRegistration />} />
              <Route path="/results" element={<Results />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App; 