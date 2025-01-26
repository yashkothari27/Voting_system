import React, { useState, useEffect } from 'react';
import { initWeb3, initContract } from './utils/web3';
import VoterRegistration from './components/VoterRegistration';
import VotingPanel from './components/VotingPanel';
import Results from './components/Results';

function App() {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    
    useEffect(() => {
        const init = async () => {
            const web3Instance = await initWeb3();
            const accounts = await web3Instance.eth.getAccounts();
            const contractInstance = await initContract('YOUR_CONTRACT_ADDRESS');
            
            setWeb3(web3Instance);
            setContract(contractInstance);
            setAccount(accounts[0]);
            
            const admin = await contractInstance.methods.admin().call();
            setIsAdmin(accounts[0].toLowerCase() === admin.toLowerCase());
        };
        
        init();
    }, []);
    
    if (!web3 || !contract || !account) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="App">
            <h1>Ethereum Voting DApp</h1>
            {isAdmin && <VoterRegistration contract={contract} account={account} />}
            <VotingPanel contract={contract} account={account} />
            <Results contract={contract} />
        </div>
    );
}

export default App; 