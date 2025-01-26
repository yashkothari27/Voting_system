require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 1337
    },
    rtc: {
      url: "https://mainnet.reltime.com",
      chainId: 32323,
      // Add your deployment account private key if you need to deploy
      // accounts: [`0x${PRIVATE_KEY}`]
    }
  }
}; 