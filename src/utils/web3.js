import Web3 from 'web3';
import VotingContract from '../contracts/Voting.json';
import config from '../config/config';
import { NETWORKS } from '../config/constants';

export const initWeb3 = async () => {
  let web3Instance = null;

  if (window.ethereum) {
    web3Instance = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Check and switch network if needed
      const chainId = await web3Instance.eth.getChainId();
      if (chainId !== config.NETWORK_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: Web3.utils.toHex(config.NETWORK_ID) }],
          });
        } catch (switchError) {
          // Add the network if it doesn't exist
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [NETWORKS.RTC_MAINNET],
            });
          } else {
            throw switchError;
          }
        }
      }
    } catch (error) {
      throw new Error('User denied account access or network switch failed');
    }
  } else if (window.web3) {
    web3Instance = new Web3(window.web3.currentProvider);
  } else {
    const provider = new Web3.providers.HttpProvider(config.API_URL);
    web3Instance = new Web3(provider);
  }

  return web3Instance;
};

export const initContract = async (contractAddress) => {
  const web3Instance = await initWeb3();
  if (!Web3.utils.isAddress(contractAddress)) {
    throw new Error('Invalid contract address');
  }
  return new web3Instance.eth.Contract(VotingContract.abi, contractAddress);
};

export const getAccounts = async () => {
    return await web3.eth.getAccounts();
}; 