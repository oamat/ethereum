module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    develope: { // default truffle develope port
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    },
    testrpc: { // default ganache-cli port
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ganache: { // default ganache GUI port
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
};