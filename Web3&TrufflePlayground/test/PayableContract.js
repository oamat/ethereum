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
    assert.typeOf(payableContract.address, 'string', "payableContract.address is a string");
    assert.lengthOf(payableContract.address, 42, 'payableContract.address has a length of 48');
    console.log("NEW Contract payableContract.address = " + payableContract.address);
    //console.log(payableContract);
  });

  it("Call First Simple Trans", async function () { //llamamos a una función simple y comporbamos que se ha guardado
    await payableContract.setGreetings('I am ready!');
    assert.equal("I am ready!", await payableContract.getGreetings());
  });

  it("Call the Payable Function", async function () { //escribimos logs de contract (event)
    let address = await payableContract.getAddress();
    let balance1 = await payableContract.getBalance();
    transaction = await payableContract.payableFunction({ value: value, from: from });
    let balance2 = await payableContract.getBalance();
    assert.lengthOf(transaction.tx, 66, 'transaction.tx has a length of 66');
    assert.equal(address, payableContract.address, 'Address must be the contract address');
    assert.equal(balance1, 0, 'Initial balance must be 0');    
    assert.equal(balance2, 5000000000000000000, 'Final balance must be 5...');
    console.log("transactionHash de la llamada a PayableFunction :" + transaction.tx);

  });

  it("Watch Last Events in PayableFunctionEvent method", async () => { //escribimos logs de contract (event)
    //console.log(transaction.logs[0].args);
    assert.equal(transaction.logs.length, 1, "should have received one event");
    assert.equal(transaction.logs[0].event, "PayableFunctionEvent", "event name should be PayableFunctionEvent");
    let valuelog = await web3.utils.fromWei(transaction.logs[0].args.value, "ether")
    assert.equal(valuelog, 5, "id must be 5");
    assert.equal(transaction.logs[0].args.sender, accounts[0], "seller must be the same");
    // assert.notEqual(transaction.logs[0].args.dna, 0, "article name must be not equal to 0");
  });


  it("Events logs", async function () { //escribimos logs de contract (event)

    // var event = await payableContract.PayableFunctionEvent( (error, result) => {// Pass a callback to start watching immediately
    //   if (error) console.log(error);
    //   console.log(result);
    // });

    // payableContract.events.PayableFunctionEvent({
    //   filter: { myIndexedParam: [20, 23] }, // Using an array means OR: e.g. 20 or 23
    //   fromBlock: 0
    // }, function(error, event){ console.log(event); })
    // .on('data', function(event){
    //     console.log(event); // same results as the optional callback above
    // })
    // .on('changed', function(event){
    //     // remove event from local database
    // })
    // .on('error', console.error);

    // transaction = await payableContract.payableFunction({ value: value, from: from });
    //console.log(event);

  });
});