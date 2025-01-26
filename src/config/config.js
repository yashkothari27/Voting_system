const config = {
  CONTRACT_ADDRESS: import.meta.env.VITE_CONTRACT_ADDRESS,
  NETWORK_ID: parseInt(import.meta.env.VITE_NETWORK_ID || '32323'),
  API_URL: import.meta.env.VITE_API_URL || 'https://mainnet.reltime.com',
};

if (!config.CONTRACT_ADDRESS) {
  console.error('Contract address not configured in environment variables');
}

export default config; 