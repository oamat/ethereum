var ZombieFactorySimple = artifacts.require("ZombieFactorySimple");  //the name of the contract (not File)
var ZombieFeeding = artifacts.require("ZombieFeeding");  //the name of the contract (not File)

module.exports = async function(deployer, network, accounts) {
  let zombieFactorySimple = await ZombieFactorySimple.new(); 
  let zombieFeeding = await ZombieFeeding.new();   
  console.log("2_deploy_contracts: ZombieFactorySimple.address for configutation: " + zombieFactorySimple.address); //dirección del contrato que se ha deployado. 
  console.log("2_deploy_contracts: zombieFeeding.address for configutation: " + zombieFeedinge.address); //dirección del contrato que se ha deployado. 
};
