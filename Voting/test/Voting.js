
// contract to be tested

/******  With Ganache started 
 * 
 * use:
 *   node .\test\Voting.js 
 * Or
 *   truffle test .\test\Voting.js
 * 
 * ****/

var Voting = artifacts.require("./Voting.sol");

require('babel-polyfill');


contract("Voting", function(accounts){  // los accounts son los de la red, podemos coger el contrato que queramos de la red 
  
  const votante1 = accounts[1]; // votante1
  const votante2 = accounts[2]; // votante2  
  var addressContract;
  let voting;
 

  it("deploy and call constructor method voting", async function() { //desplegar contratos
    voting = await Voting.new(['Eva', 'Uri', 'Pep']);   
    addressContract =  await voting.obtenerDireccionContrato();
    console.log( "addressContract :  " + addressContract)
  });
   

  it("Votar votante1", async function() { //desplegar contratos
    await voting.voteForCandidate("Eva", {from: votante1});
    await voting.voteForCandidate("Eva", {from: votante1});
    assert.equal(2, await voting.totalVotesFor("Eva") );   
  });

  it("Votar votante2", async function() { //desplegar contratos
     await voting.voteForCandidate("Eva", {from: votante2});
     await voting.voteForCandidate("Uri", {from: votante2});
     await voting.voteForCandidate("Pep", {from: votante2});
    assert.equal(3, await voting.totalVotesFor("Eva") );   
    assert.equal(1, await voting.totalVotesFor("Uri") );   
    assert.equal(1, await voting.totalVotesFor("Pep") );   
  });


  it("Write logs", async function() { //escribimos logs de contract (event)
    
    let transferEvent = voting.logString({}, {fromBlock: 0, toBlock: 'latest'});
    transferEvent.get((error, logs) => {    
           logs.forEach(log => console.log(log.args)) 
      }); 

      let transferEventBytes = voting.logBytes({}, {fromBlock: 0, toBlock: 'latest'});
      transferEventBytes.get((error, logs) => {    
        logs.forEach( log => { 
                console.log(log.args); 
                console.log(hex_to_ascii(log.args._value));
               }) 
      }); 

  });


  function hex_to_ascii(str1) {
    var hex  = str1.toString();
	  var str = '';
	  for (var n = 0; n < hex.length; n += 2) {
		  str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	  }
	  return str;
 }

});
