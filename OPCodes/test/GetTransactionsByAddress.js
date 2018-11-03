// contract to be tested
/******  With Ganache started 
 * 
 * use:
 *   node .\test\PayableContract.js 
 * Or
 *   truffle test .\test\PayableContract.js
 * 
 * ****/

var PayableContract = artifacts.require("./PayableContract.sol");

contract("PayableContract", function(accounts){  // los accounts son los de la red, podemos coger el contrato que queramos de la red 
  
  
  it("Deploy PayableContract", async function() { //desplegar contratos
    payableContract = await PayableContract.new(); 
    console.log("payableContract.address : " +payableContract.address );      
  });

  it("First Trans", async function() { //desplegar contratos
    await payableContract.setGreetings('I am ready!');
    assert.equal("I am ready!", await payableContract.getGreetings());   
  });

  it("Write logs", async function() { //escribimos logs de contract (event)
    await payableContract.payableFunction({ from: from, value: value});
    let transferEvent = payableContract.log({}, {fromBlock: 0, toBlock: 'latest'});
    transferEvent.get((error, logs) => {    
           logs.forEach(log => console.log(log.args)) 
      }); 
  });

});