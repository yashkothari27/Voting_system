import React, { useState } from 'react';

function VoterRegistration({ contract, account }) {
    const [voterAddress, setVoterAddress] = useState('');
    const [candidateName, setCandidateName] = useState('');
    
    const registerVoter = async (e) => {
        e.preventDefault();
        try {
            await contract.methods.registerVoter(voterAddress)
                .send({ from: account });
            setVoterAddress('');
            alert('Voter registered successfully!');
        } catch (error) {
            console.error(error);
            alert('Error registering voter');
        }
    };
    
    const addCandidate = async (e) => {
        e.preventDefault();
        try {
            await contract.methods.addCandidate(candidateName)
                .send({ from: account });
            setCandidateName('');
            alert('Candidate added successfully!');
        } catch (error) {
            console.error(error);
            alert('Error adding candidate');
        }
    };
    
    return (
        <div>
            <h2>Admin Panel</h2>
            <form onSubmit={registerVoter}>
                <input
                    type="text"
                    value={voterAddress}
                    onChange={(e) => setVoterAddress(e.target.value)}
                    placeholder="Voter Address"
                />
                <button type="submit">Register Voter</button>
            </form>
            
            <form onSubmit={addCandidate}>
                <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="Candidate Name"
                />
                <button type="submit">Add Candidate</button>
            </form>
        </div>
    );
}

export default VoterRegistration; 