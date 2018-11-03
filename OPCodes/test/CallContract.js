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
const truffleContract = require('truffle-contract');		//modulo para transacciones
const fs = require('fs');

var we3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
var web3 = new Web3(we3Provider);



//DIRECTAMENTE WEB3
it("Call Contract directly (by Address and JSON contract)", async function () {
    var contractAddress = "0xf25186b5081ff5ce73482ad761db0eb0d25abfbf";
    var JSONcontract = JSON.parse(fs.readFileSync('./build/contracts/PayableContract.json', 'utf8'));
    var contract = web3.eth.contract(JSONcontract.abi).at(contractAddress);
    assert.equal("0xf25186b5081ff5ce73482ad761db0eb0d25abfbf", contract.address);
});


//Mediante truffle con Address y JSON
it("Call Contract with truffle-contract lib (by Address and JSON contract)", async function () {
    var contractAddresstruffle1 = "0xf25186b5081ff5ce73482ad761db0eb0d25abfbf";
    var contractAbitruffle1 = require('../build/contracts/PayableContract.json');
    var contracttruffle1 = truffleContract(contractAbitruffle1).at(contractAddresstruffle1);
    assert.equal("0xf25186b5081ff5ce73482ad761db0eb0d25abfbf", contracttruffle1.address);
});

//Mediante truffle sólo con JSON (SIN Address) 
it("Call Contract with truffle-contract lib, without Address ", function () {
    var contractAbitruffle2 = require('../build/contracts/PayableContract.json');
    var contracttruffle2 = truffleContract(contractAbitruffle2);
    contracttruffle2.setProvider(we3Provider);
    contracttruffle2.deployed().then(function (instance) {
        console.log(instance.address);
        assert.equal("0xf25186b5081ff5ce73482ad761db0eb0d25abfbf", instance.address);
    });


});


//Mediante SOL (solidity code)
it("Call Contract with SOL contract ", async function () {
    var SOLContract = artifacts.require("../contracts/PayableContract.sol");
    //SOLContract.deployed().then(function (instance) {
    //  console.log(instance);
    // assert.equal("0xf25186b5081ff5ce73482ad761db0eb0d25abfbf", instance.address);
    //});

});

