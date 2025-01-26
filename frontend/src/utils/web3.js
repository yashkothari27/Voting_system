import Web3 from 'web3';
import VotingContract from '../../contracts/Voting.json';

let web3;
let votingContract;

export const initWeb3 = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        console.error("No web3 provider detected");
    }
    return web3;
};

export const initContract = async (contractAddress) => {
    if (!web3) {
        await initWeb3();
    }
    votingContract = new web3.eth.Contract(VotingContract.abi, contractAddress);
    return votingContract;
};

export const getAccounts = async () => {
    return await web3.eth.getAccounts();
}; 