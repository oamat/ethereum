// contract to be tested
/******  With Ganache started 
 * 
 *  truffle test .\test\PayableContract.js --network ganache
 * 
 * ****/
const assert = require('chai').assert;



contract("PayableContract", async (accounts) => {  // los accounts son los de la red, podemos coger el wallet que queramos de la red 
  var PayableContract = artifacts.require("PayableContract"); //la manera de instanciar de truffle. 
  const from = accounts[0]; // account0
  var payableContract;
  var transaction;
  var value = web3.utils.toWei(web3.utils.toBN(5), 'ether');

  it("Create New PayableContract Smart Contract with truffle.", async () => { //Se crea el contato en ganache 
    payableContract = await PayableContract.new(); // mejor siempre crear uno nuevo. con address nueva
    assert.exists(payableContract.address, 'PayableContract is neither `null` nor `undefined`.');
    assert.typeOf(payableContract.address, 'string', "zombieFactory.address is a string");
    assert.lengthOf(payableContract.address, 42, 'zombieFactory.address has a length of 48');
    console.log("NEW Contract zombieFactory.address = " + payableContract.address);
    //console.log(zombieFactory);
  });

  it("Call First Simple Trans", async function () { //llamamos a una función simple y comporbamos que se ha guardado
    await payableContract.setGreetings('I am ready!');
    assert.equal("I am ready!", await payableContract.getGreetings());
  });

  it("Call the Payable Function", async function () { //escribimos logs de contract (event)
    transaction = await payableContract.payableFunction({ value: value, from: from });
    assert.lengthOf(transaction.tx, 66, 'transaction.tx has a length of 66');
    console.log("transactionHash del primer Zombie :" + transaction.tx);
  });

  it("Watch Last Events in PayableFunctionEvent method", async () => { //escribimos logs de contract (event)
    //console.log(transaction.logs[0].args);
    assert.equal(transaction.logs.length, 1, "should have received one event");
    assert.equal(transaction.logs[0].event, "PayableFunctionEvent", "event name should be NewZombie");
    let valuelog = await web3.utils.fromWei(transaction.logs[0].args.value, "ether")
    assert.equal(valuelog, 5, "id must be 5");
    assert.equal(transaction.logs[0].args.sender, accounts[0], "seller must be the same");
    // assert.notEqual(transaction.logs[0].args.dna, 0, "article name must be not equal to 0");
  });


  it("Events logs", async function () { //escribimos logs de contract (event)
   
    var event = await payableContract.PayableFunctionEvent( (error, result) => {// Pass a callback to start watching immediately
      if (error) console.log(error);
      console.log(result);
    });

    transaction = await payableContract.payableFunction({ value: value, from: from });
    //console.log(event);

  });
});