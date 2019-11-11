// contract to be tested
/******  With Ganache started 
 * 
 * use:
 *   node .\test\CallContract.js 
 * Or
 *   truffle test .\test\CallContract.js
 * 
 * ****/

const Web3 = require('web3');  //web3 para conectar js con blockChain
var truffleContract = require("@truffle/contract");		//modulo para transacciones
const fs = require('fs');

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

var smartContractAddress="0xEE9e6c048667120200b47cBBa56Ad3C64054A3B5";

//DIRECTAMENTE WEB3
it("Call Contract directly with web3 (by Address and contract JSON)", async function () {
    var JSONcontract = JSON.parse(fs.readFileSync('./build/contracts/PayableContract.json', 'utf8'));
    var contract = await new web3.eth.Contract(JSONcontract.abi,smartContractAddress); 
    assert.equal(smartContractAddress, contract.options.address);
});


//Mediante truffle con Address y JSON
it("Call Contract with truffle-contract lib (by Address and JSON contract)", async function () {
    var contractAbitruffle1 = require('../build/contracts/PayableContract.json');
    var MyContract = truffleContract({
        abi: contractAbitruffle1.abi,
        unlinked_binary: ...,
        address: smartContractAddress, // optional
        // many more
      })
      MyContract.setProvider(provider);

    
    var contracttruffle1 = await truffleContract(contractAbitruffle1).at(contractAddresstruffle1);
    assert.equal(smartContractAddress, contracttruffle1.address);
});

// //Mediante truffle sólo con JSON (SIN Address) 
// it("Call Contract with truffle-contract lib, without Address ", function () {
//     var contractAbitruffle2 = require('../build/contracts/PayableContract.json');
//     var contracttruffle2 = await truffleContract(contractAbitruffle2);
//     contracttruffle2.setProvider(we3Provider);
//     contracttruffle2.deployed().then(function (instance) {
//         console.log(instance.address);
//         assert.equal(smartContractAddress, instance.address);
//     });


// });


// //Mediante SOL (solidity code)
// it("Call Contract with SOL contract ", async function () {
//     var SOLContract = artifacts.require("../contracts/PayableContract.sol");
//     //SOLContract.deployed().then(function (instance) {
//     //  console.log(instance);
//     // assert.equal(smartContractAddress, instance.address);
//     //});

// });

