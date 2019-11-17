var ZombieFactorySimple = artifacts.require("ZombieFactorySimple");  //the name of the contract (./build/[name].json)
var KittyFactory = artifacts.require("KittyFactory");  //the name of the contract (./build/[name].json)

var ZombieFeeding = artifacts.require("ZombieFeeding");  //the name of the contract (./build/[name].json)   
    //we need kittyFactory address for constructor initialize method 

module.exports = async function(deployer, network, accounts) {
  let zombieFactorySimple = await ZombieFactorySimple.new();   
  let kittyFactory = await KittyFactory.new();   
  console.log("2_deploy_contracts: ZombieFactorySimple.address for configutation: " + zombieFactorySimple.address); //dirección del contrato que se ha deployado.   
  console.log("2_deploy_contracts: kittyFactory.address for configutation: " + kittyFactory.address); //dirección del contrato que se ha deployado. 


  //we need kittyFactory address for constructor initialize method   
  let zombieFeeding = await ZombieFeeding.new(kittyFactory.address);
  console.log("2_deploy_contracts: zombieFeeding.address for configutation: " + zombieFeeding.address); //dirección del contrato que se ha deployado.
};
