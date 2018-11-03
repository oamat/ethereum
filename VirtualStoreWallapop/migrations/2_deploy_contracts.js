var ChainStore = artifacts.require("./ChainStore.sol");

module.exports = function(deployer) {
  deployer.deploy(ChainStore);
}
