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

  const from = accounts[5]; // jugador1
  const value = 5e+18;
  var addressContract;
  let greetings;


  it("deploy and call constructor method apuestas", async function () { //desplegar contratos
    greetings = await GreetingsLog.new();
  });

  it("Change reetings, setGrettings", async function () { //desplegar contratos
    await greetings.setGreetings('I am ready!');
    assert.equal("I am ready!", await greetings.getGreetings());
  });

  it("Write logs", async function () { //escribimos logs de contract (event)
    await greetings.payableFunction({ from: from, value: value });
    const writelog = await greetings.writeLog();

    assert.equal(writelog.logs.length, 1, "should have received one event");
    assert.equal(writelog.logs[0].event, "logGreetings", "event name should be logGreetings");
    assert.equal(writelog.logs[0].args.value, "5000000000000000000", "id must be 5000000000000000000");
    assert.equal(writelog.logs[0].args.sender, "0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e", "seller must be 0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e");
    assert.equal(writelog.logs[0].args.coinbase, "0x0000000000000000000000000000000000000000", "article name must be 0x0000000000000000000000000000000000000000");
    assert.equal(writelog.logs[0].args.difficulty, 0, "article price must be ");
  });

});