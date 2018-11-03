var Apuestas = artifacts.require("Apuestas");
var CompraArbitrada = artifacts.require("CompraArbitrada");
var GreetingsLog = artifacts.require("GreetingsLog");

module.exports = async function(deployer, network, accounts) {
  let apuestas = await Apuestas.new();
  let compraArbitrada = await CompraArbitrada.new(accounts[1], accounts[2]); //accounts[0] will be sender
  let geetings = await GreetingsLog.new(); 
  console.log("2_deploy_contracts: compraArbitrada.address for configutation: " + compraArbitrada.address); //dirección del contrato que se ha deployado. 
};
