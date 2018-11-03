// contract to be tested
/******  With Ganache started 
 * 
 * use:
 *   node .\test\CompraArbitrada.js 
 * Or
 *   truffle test .\test\CompraArbitrada.js
 * 
 * ****/
/* debido al gas usamos isBelow, isAbove en los test */ 


var CompraArbitrada = artifacts.require("./CompraArbitrada.sol");

contract("CompraArbitrada", function(accounts){  // los accounts son los de la red, podemos coger el contrato que queramos de la red 
  const comprador = accounts[0]; // comprador
  const vendedor = accounts[1]; // vendedor
  const arbitro = accounts[2];  //arbitro
  const value = 5e+18;
  const valueLess = 1e+18;
  var valueComprador, valueVendedor, valueContrato;
  var valueAntesComprador , valueAntesVendedor ,valueAntesContrato;
  
  let compraArbitrada;

  
  it("deploy, call constructor method and test Roles", async function() { //desplegar contratos y comprovar
    compraArbitrada = await CompraArbitrada.new(vendedor, arbitro, {from: comprador}); //pasamos el from 'forzado', si no por defecto cogería accounts[0]   
   
    //console.log(" compraArbitrada.address " + compraArbitrada.address );
   
    assert.equal( await compraArbitrada.obtenerDireccionComprador(),comprador, "comprador address is accounts[0]");    
    assert.equal( await compraArbitrada.obtenerDireccionVendedor(),vendedor, "vendedor address is accounts[1]");
    assert.equal( await compraArbitrada.obtenerDireccionArbitro(),arbitro , "arbitro address is accounts[2]");
  });

  
  it("Compra, problema comprador y se devuelve todo el dinero al comprador", async function() {  
    
    valueAntesComprador =  parseInt(await compraArbitrada.obtenerBalanceComprador());
    valueAntesVendedor =  parseInt(await compraArbitrada.obtenerBalanceVendedor());
    valueAntesContrato =  parseInt(await compraArbitrada.obtenerBalanceContrato());
    
    await compraArbitrada.compra({ value: value , from: comprador , gas: "300000",  gasPrice: "0"}); // comprador quiere comprar
    
    valueComprador =  parseInt(await compraArbitrada.obtenerBalanceComprador());
    valueVendedor =  parseInt(await compraArbitrada.obtenerBalanceVendedor());
    valueContrato =  parseInt(await compraArbitrada.obtenerBalanceContrato());


    assert.isBelow( valueComprador, valueAntesComprador, "comprador pays" );
    assert.equal( valueVendedor, valueAntesVendedor, "Vendedor not receive money" );
    assert.isAbove( valueContrato, valueAntesContrato, "contrato receive money" );

    await compraArbitrada.devolverAlComprador({ from: comprador, gas: "300000",  gasPrice: "0" }); // el comprador anula compra por que ha habido un problema


    valueComprador =  parseInt(await compraArbitrada.obtenerBalanceComprador());
    valueVendedor =  parseInt(await compraArbitrada.obtenerBalanceVendedor());
    valueContrato =  parseInt(await compraArbitrada.obtenerBalanceContrato());

    assert.equal( valueComprador, valueAntesComprador, "return back money to comprador " );
    assert.equal( valueVendedor, valueAntesVendedor, "Vendedor not receive money" );
    assert.equal( valueContrato, valueAntesContrato, "contrato return back money to comprador" );


  });



  it("Compra, problema comprador y arbitro devuelve el dinero al comprador, pero menos dinero", async function() {
    valueAntesComprador =  parseInt(await compraArbitrada.obtenerBalanceComprador());
    valueAntesVendedor =  parseInt(await compraArbitrada.obtenerBalanceVendedor());
    valueAntesContrato =  parseInt(await compraArbitrada.obtenerBalanceContrato());
    
    await compraArbitrada.compra({ value: value , from: comprador, gas: "300000",  gasPrice: "0" }); // comprador quiere comprar
    
    valueComprador =  parseInt(await compraArbitrada.obtenerBalanceComprador());
    valueVendedor =  parseInt(await compraArbitrada.obtenerBalanceVendedor());
    valueContrato =  parseInt(await compraArbitrada.obtenerBalanceContrato());

    assert.isBelow( valueComprador, valueAntesComprador, "comprador pays" );
    assert.equal( valueVendedor, valueAntesVendedor, "Vendedor not receive money" );
    assert.isAbove( valueContrato, valueAntesContrato, "contrato receive money" );

    await compraArbitrada.devolverAlComprador({ from: arbitro, gas: "300000",  gasPrice: "0" }); // el comprador anula compra por que ha habido un problema

    assert.equal( (await compraArbitrada.obtenerBalanceComprador()).toNumber(), valueAntesComprador, "return back money to comprador " );
    assert.equal( (await compraArbitrada.obtenerBalanceVendedor()).toNumber(), valueAntesVendedor, "Vendedor not receive money" );
    assert.equal( (await compraArbitrada.obtenerBalanceContrato()).toNumber(), valueAntesContrato, "contrato return back money to comprador" );

  });


  it("Compra, todo OK y Arbitro ejecuta pago al vendedor", async function() {
    valueAntesComprador =  parseInt(await compraArbitrada.obtenerBalanceComprador());
    valueAntesVendedor =  parseInt(await compraArbitrada.obtenerBalanceVendedor());
    valueAntesContrato =  parseInt(await compraArbitrada.obtenerBalanceContrato());
    
    await compraArbitrada.compra({ value: value , from: comprador, gas: "300000",  gasPrice: "0" }); // comprador quiere comprar
    
    valueComprador =  parseInt(await compraArbitrada.obtenerBalanceComprador());
    valueVendedor =  parseInt(await compraArbitrada.obtenerBalanceVendedor());
    valueContrato =  parseInt(await compraArbitrada.obtenerBalanceContrato());

    assert.isBelow( valueComprador, valueAntesComprador, "comprador pays" );
    assert.equal( valueVendedor, valueAntesVendedor, "Vendedor not receive money" );
    assert.isAbove( valueContrato, valueAntesContrato, "contrato receive money" );

    await compraArbitrada.pagarAlVendedor({from: arbitro, gas: "300000",  gasPrice: "0" }); // el arbitro paga al vendedor por que todo está OK

    assert.isBelow( (await compraArbitrada.obtenerBalanceComprador()).toNumber(), valueAntesComprador, "return back money to comprador " );
    assert.isAbove( (await compraArbitrada.obtenerBalanceVendedor()).toNumber(), valueAntesVendedor, "Vendedor not receive money" );
    assert.equal( (await compraArbitrada.obtenerBalanceContrato()).toNumber(), valueAntesContrato, "contrato return back money to comprador" );
    assert.equal( (await compraArbitrada.obtenerBalanceContrato()).toNumber(), 0, "contrato return back money to comprador" );


  });
   

});
