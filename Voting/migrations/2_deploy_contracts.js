var Voting = artifacts.require("Voting");

module.exports = async function(deployer, network, accounts) {
  let votingInstanceFuture = Voting.new(['Eva', 'Uri', 'Pep']);
  let votingInstance = await votingInstanceFuture;
  console.log("2_deploy_contracts: votingInstance.address for configutation: " + votingInstance.address); //dirección del contrato que se ha deployado. 
};
