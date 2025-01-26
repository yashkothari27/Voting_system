export const NETWORKS = {
  RTC_MAINNET: {
    chainId: '0x7e43', // 32323 in hex
    chainName: 'RTC Mainnet',
    nativeCurrency: {
      name: 'RTC',
      symbol: 'RTC',
      decimals: 18
    },
    rpcUrls: [import.meta.env.VITE_API_URL || 'https://mainnet.reltime.com'],
    blockExplorerUrls: ['https://explorer.reltime.com']
  }
};

export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
export const NETWORK_ID = parseInt(import.meta.env.VITE_NETWORK_ID || '32323');

export const VOTER_STATUS = {
  UNREGISTERED: 'UNREGISTERED',
  REGISTERED: 'REGISTERED',
  VERIFIED: 'VERIFIED',
  VOTED: 'VOTED'
};

export const VOTING_STATES = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  ENDED: 'ENDED'
}; 