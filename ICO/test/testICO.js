const ICO = artifacts.require("ICO");
const Token = artifacts.require("Token");
const value = web3.utils.toWei(web3.utils.toBN(5), 'ether');

contract("ICO", function (accounts) {  // los accounts son los de la red, podemos coger el contrato que queramos de la red 
  const ownerAccount = accounts[0]; //owner account asumirá gastos por gas
  const ICOAccount = accounts[1]; // Cuenta destino ethers de la ICO (Diferente de dirección contratoICO)
  const TokenHolderAccount = accounts[2];  //un pagador (Tokens)

  let token;
  let ico;
  var transactionEvent;

  it("Deploys all contracts and initialize ICO", async function () { //desplegar contratos
    token = await Token.new();
    ico = await ICO.new();

    await token.changeController(ico.address); //El controller será el ICO

    await ico.initialize(     //método inicializador ICO.
      token.address,
      ICOAccount
    );
  });


  it("Does the first buy", async function () { //primera compra
    const etherTH1before = await web3.eth.getBalance(TokenHolderAccount);
    let balanceEth = await web3.utils.fromWei(etherTH1before, "ether") + " ether";
    console.log("Holder " + TokenHolderAccount + " Account have before transfer : " + balanceEth + " Ether");

    await token.sendTransaction({  // es una transacción nueva, no es ningún método existente, lo pasará a método vacio payable
      value: value,
      gas: "300000",
      gasPrice: "20000000000",
      from: TokenHolderAccount
    });

    const owner = await ico.obtenerDireccionOwner(); //por defecto account[0] es el comprador msg.sender. 
    const contrato = await ico.obtenerDireccionContrato(); //una nueva dirección.   

    console.log("owner : " + owner);
    console.log("Holder : " + TokenHolderAccount);
    console.log("ICOAccount : " + ICOAccount);
    console.log("contrato : " + contrato);

    let balance = await token.balanceOf(TokenHolderAccount);  //comprobamos que se han recibido los toquens
    let totalEth = await web3.eth.getBalance(ICOAccount); //usando web3 

    assert.equal(parseInt(web3.utils.fromWei(balance, "ether")), 10, 'Balance of Holder should be 10'); //es el valor asignado en ICO( Tokens por ether.
    assert.isAbove(parseInt(web3.utils.fromWei(totalEth, "ether")), 100, 'Balance of ICO  should be Above 100'); //si usamos ganache, se empieza con 100,  tendremos más de 100
    assert.isBelow(parseInt(web3.utils.fromWei(balance, "ether")), 100, 'Balance of Holder  should below 100'); //si usamos ganache, se empieza con 100,  tendremos menos de 100


    const etherTH1after = await web3.eth.getBalance(TokenHolderAccount);

    console.log("ICO " + totalEth + " Account have After transfer : " + web3.utils.fromWei(totalEth, "ether") + " Ether");
    console.log("Holder " + TokenHolderAccount + " Account have After transfer : " + web3.utils.fromWei(etherTH1after, "ether") + " Ether");

  });


  it("transferFrom to ICO Account", async () => { //escribimos logs de contract (event)
    transactionEvent = await token.transfer(ICOAccount, value);  //transfer(address _to, uint256 _value)
    assert.exists(transactionEvent.tx, 'transactionEvent.tx is neither `null` nor `undefined`');
    assert.lengthOf(transactionEvent.tx, 66, 'transaction.tx has a length of 66');
    //console.log("transactionHash de transferFrom :" + transactionEvent.tx);
  });

  it("Watch Last Events in transfer(address _to, uint256 _value) method", async () => { //escribimos logs de contract (event)
   //console.log(transactionEvent.logs[0]);
    assert.equal(transactionEvent.logs.length, 1, "should have received one event");
    assert.equal(transactionEvent.logs[0].event, "TransferLog", "event name should be logGreetings");
    let value = await web3.utils.fromWei(transactionEvent.logs[0].args._value, "ether")
    assert.equal(value, 5, "id must be 5.");
  });







  function hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }

});
