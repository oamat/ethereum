// contract to be tested
/******  With Ganache started 
 * 
 * use:
 *   node .\test\GreetingsLog.js 
 * Or
 *   truffle test .\test\GreetingsLog.js
 * 
 * ****/

var GreetingsLog = artifacts.require("./GreetingsLog.sol");

contract("GretingsLog", function(accounts){  // los accounts son los de la red, podemos coger el contrato que queramos de la red 
  
  const from = accounts[5]; // jugador1
  const value = 5e+18;
  var addressContract;
  let greetings;


  it("deploy and call constructor method apuestas", async function() { //desplegar contratos
    greetings = await GreetingsLog.new();       
  });

  it("Cchange reetings, setGrettings", async function() { //desplegar contratos
    await greetings.setGreetings('I am ready!');
    assert.equal("I am ready!", await greetings.getGreetings());   
  });

  it("Write logs", async function() { //escribimos logs de contract (event)
    await greetings.payableFunction({ from: from, value: value});
    await greetings.writeLog();
    
    let transferEvent = greetings.log({}, {fromBlock: 0, toBlock: 'latest'});
    transferEvent.get((error, logs) => {    
           logs.forEach(log => console.log(log.args)) 
      }); 
  });

});