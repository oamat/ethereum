var PayableContract = artifacts.require("PayableContract");

module.exports = async function(deployer, network, accounts) {
  let payableContract = await PayableContract.new(); 
  console.log("2_deploy_contracts: PayableContract.address for configutation: " + payableContract.address); 
  //dirección del contrato que se ha deployado. 
};
