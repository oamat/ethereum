
// contract to be tested
// SMART CONTRACT de pruebas, que permite que un jugador1 realice una apuesta,
// que otro jugador2 acepte la apuesta y que gane alguien aleatoriamente.  **/

/******  With Ganache started 
 * 
 * use:
 *   node .\test\Apuestas.js 
 * Or
 *   truffle test .\test\Apuestas.js
 * 
 * ****/

var Apuestas = artifacts.require("./Apuestas.sol");

contract("Apuestas", function (accounts) {  // los accounts son los de la red, podemos coger el contrato que queramos de la red 

  const jugador1 = accounts[1]; // jugador1
  const jugador2 = accounts[2]; // jugador2
  const value = web3.utils.toBN(5);
  var addressContract;
  let apuestas;
  var balanceContrato;
  var balanceContratoInicial;

  it("deploy and call constructor method apuestas", async function () { //desplegar contratos
    apuestas = await Apuestas.new();
    balanceContratoInicial = parseInt(await apuestas.obtenerBalanceContrato());
    assert.equal(await apuestas.obtenerEstado(), 'sinApuesta');
    addressContract = await apuestas.obtenerDireccionContrato();
    console.log("addressContract :  " + addressContract)
  });


  it("Apostar jugador1", async function () { //desplegar contratos
    balanceContrato = parseInt(await apuestas.obtenerBalanceContrato());
    await apuestas.apostar({ value: value, from: jugador1 });
    assert.equal(await apuestas.obtenerEstado(), "apuestaHecha");
    assert.equal(await apuestas.obtenerDireccionJugador1(), jugador1);
    assert.isAbove(parseInt(await apuestas.obtenerBalanceContrato()), balanceContrato, "Balance contrato ha crecido en 5ETH.");
  });

  it("Aceptar Apuesta jugador2", async function () { //desplegar contratos
    balanceContrato = parseInt(await apuestas.obtenerBalanceContrato());
    await apuestas.aceptarApuesta({ value: value, from: jugador2 });
    assert.equal(await apuestas.obtenerEstado(), "apuestaAceptada");;
    assert.equal(await apuestas.obtenerDireccionJugador2(), jugador2);
    assert.isAbove(parseInt(await apuestas.obtenerBalanceContrato()), balanceContrato, "Balance contrato ha crecido en 5ETH.");
  });

  var resolverApuesta;

  it("Aceptar Apuesta jugador2", async function () { //desplegar contratos

    resolverApuesta = await apuestas.resolverApuesta();
    assert.equal(await apuestas.obtenerEstado(), "sinApuesta");
    assert.equal(balanceContratoInicial, parseInt(await apuestas.obtenerBalanceContrato()));
  });


  it("Write logs", async function () { //escribimos logs de contract (event)


    assert.equal(resolverApuesta.logs.length, 1, "should have received one event");
    assert.equal(resolverApuesta.logs[0].event, "logApuestaGanadora", "event name should be LogSellArticle");
    //assert.equal(resolverApuesta.logs[0].args._value, "Gana Jugador2"  , "id must be 'Gana Jugador1'");
    console.log(resolverApuesta.logs[0].args._value);
  });


});
