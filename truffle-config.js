require('babel-register');
require('babel-polyfill');

var HDWalletProvider = require("truffle-hdwallet-provider")
var mnemonic = "rail there lecture demise rally blade hollow menu figure art century disorder"

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },

    //Connect with Infura
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/b153f1ff428b4eb0aa97e21ad290fa81")
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },

    //Connect with BSC-Testnet
    bscTestnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.6.8",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
