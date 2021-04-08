require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "0.0.0.0",
      port: 8545,
      network_id: "1617866601085" // Match any network id
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
