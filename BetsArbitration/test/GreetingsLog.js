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

contract("GretingsLog", function (accounts) {  // los accounts son los de la red, podemos coger el contrato que queramos de la red 

  const from = accounts[0]; // account0
  const value = 5e+18;
  let greetings;


  it("deploy and call constructor method apuestas", async function () { //desplegar contratos
    greetings = await GreetingsLog.new();
  });

  it("Change Greetings, setGrettings", async function () { //desplegar contratos
    await greetings.setGreetings('I am ready!');
    assert.equal("I am ready!", await greetings.getGreetings());
  });

  it("Write logs", async function () { //escribimos logs de contract (event)
    await greetings.payableFunction({ from, value });  //Por defecto se paga a coinbase. 
    const writelog = await greetings.writeLog();
    const addresscontract = await greetings.getMyAddress();
    let balance = await web3.eth.getBalance(addresscontract);
    let balanceEth = await web3.utils.fromWei(balance, "ether") + " ether";
    console.log("Balance addresscontract :" + addresscontract + " : " + balanceEth);

    assert.equal(writelog.logs.length, 1, "should have received one event");
    assert.equal(writelog.logs[0].event, "logGreetings", "event name should be logGreetings");
    assert.equal(writelog.logs[0].args.value, "5000000000000000000", "id must be 5000000000000000000");
    assert.equal(writelog.logs[0].args.sender, "0xc5F1c2440dF300C6Ad97358Eb3AA160546B81693", "seller must be 0x5ab0f05E3DC3c65d8C2cB9F654CC92A0641af9EB");
    assert.equal(writelog.logs[0].args.coinbase, "0x0000000000000000000000000000000000000000", "article name must be 0x0000000000000000000000000000000000000000");
    assert.equal(writelog.logs[0].args.difficulty, 0, "article price must be ");
  });

});