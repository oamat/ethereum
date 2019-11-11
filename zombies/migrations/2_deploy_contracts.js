var ZombieFactory = artifacts.require("ZombieFactory");  //the name of the contract (not File)

module.exports = async function(deployer, network, accounts) {
  let zombieFactory = await ZombieFactory.new();  
  console.log("2_deploy_contracts: ZombieFactory.address for configutation: " + zombieFactory.address); //dirección del contrato que se ha deployado. 
};
