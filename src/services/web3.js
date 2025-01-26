import Web3 from 'web3';
import VotingContract from '../contracts/Voting.json';
import config from '../config/config';

let web3Instance = null;

export const initWeb3 = async () => {
  if (web3Instance) return web3Instance;

  if (window.ethereum) {
    web3Instance = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Request network switch if not on RTC Mainnet
      const chainId = await web3Instance.eth.getChainId();
      if (chainId !== 32323) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x7e43' }], // 32323 in hex
          });
        } catch (switchError) {
          // If the network doesn't exist in the wallet, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x7e43',
                chainName: 'RTC Mainnet',
                nativeCurrency: {
                  name: 'RTC',
                  symbol: 'RTC',
                  decimals: 18
                },
                rpcUrls: ['https://mainnet.reltime.com'],
                blockExplorerUrls: ['https://explorer.reltime.com']
              }]
            });
          }
        }
      }
    } catch (error) {
      throw new Error('User denied account access');
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
  if (!web3Instance) {
    await initWeb3();
  }

  if (!contractAddress) {
    throw new Error('Contract address is not defined in environment variables');
  }

  try {
    const networkId = await web3Instance.eth.net.getId();
    console.log('Network ID:', networkId);
    console.log('Contract Address:', contractAddress);
    
    const contract = new web3Instance.eth.Contract(
      VotingContract.abi,
      contractAddress
    );

    // Verify contract exists at address
    const code = await web3Instance.eth.getCode(contractAddress);
    if (code === '0x') {
      throw new Error('No contract found at specified address');
    }

    return contract;
  } catch (error) {
    console.error('Contract initialization error:', error);
    throw new Error('Failed to initialize contract: ' + error.message);
  }
};

export const getAccounts = async () => {
  if (!web3Instance) {
    await initWeb3();
  }
  return await web3Instance.eth.getAccounts();
};

// Add event listeners for account changes
if (window.ethereum) {
  window.ethereum.on('accountsChanged', () => {
    window.location.reload();
  });

  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });
} 