const ICO = artifacts.require("ICO");
const Token = artifacts.require("Token");

contract("ICO", function(accounts){  // los accounts son los de la red, podemos coger el contrato que queramos de la red 
  const ownerAccount = accounts[0]; //owner account asumirá gastos por gas
  const ICOAccount = accounts[1]; // Cuenta destino ethers de la ICO (Diferente de dirección contratoICO)
  const TokenHolderAccount = accounts[2];  //un pagador (Tokens)

  let token;
  let ico;

  it("Deploys all contracts", async function() { //desplegar contratos
    token = await Token.new();
    ico = await ICO.new();

    await token.changeController(ico.address); //El controller será el ICO

    await ico.initialize(     //método inicializador ICO.
        token.address,
        ICOAccount
    );
  });

  it("Does the first buy", async function() { //primera compra
     const etherTH1before = await web3.eth.getBalance(TokenHolderAccount);
     console.log("Holder " +  TokenHolderAccount  + " Account have before transfer : " + web3.fromWei(etherTH1before).toNumber() + " Ether");

    await token.sendTransaction({  // es una transacción nueva, no es ningún método existente, lo pasará a método vacio payable
      value: web3.toWei(5), 
      gas: "300000",
      gasPrice: "20000000000",
      from: TokenHolderAccount
    });

    const owner  = await ico.obtenerDireccionOwner(); //por defecto account[0] es el comprador msg.sender. 
    const contrato  = await ico.obtenerDireccionContrato(); //una nueva dirección.   
    
    console.log("owner : " +  owner);
    console.log("Holder : " +  TokenHolderAccount);
    console.log("ICOAccount : " +  ICOAccount);
    console.log("contrato : " +  contrato);

    const balance = await token.balanceOf(TokenHolderAccount);  //comprobamos que se han recibido los toquens
    const totalEth = await web3.eth.getBalance(ICOAccount); //usando web3 

    assert.equal(web3.fromWei(balance).toNumber(), 10, 'Balance of Holder should be 10'); //es el valor asignado en ICO( Tokens por ether.
    assert.isAbove(web3.fromWei(totalEth).toNumber(), 100, 'Balance of ICO  should be Above 100'); //si usamos ganache, se empieza con 100,  tendremos más de 100
    assert.isBelow(web3.fromWei(balance).toNumber(), 100, 'Balance of Holder  should below 100'); //si usamos ganache, se empieza con 100,  tendremos menos de 100


    const etherTH1after = await web3.eth.getBalance(TokenHolderAccount);
  
    console.log( "ICO " + totalEth  + " Account have After transfer : " + web3.fromWei(totalEth).toNumber() + " Ether");
    console.log( "Holder " + TokenHolderAccount  + " Account have After transfer : " + web3.fromWei(etherTH1after).toNumber() + " Ether");
    
  });


  it("Write logs", async function() { //escribimos logs de contract (event)
    
    let transferEvent = token.TransferLog({}, {fromBlock: 0, toBlock: 'latest'});
    transferEvent.get((error, logs) => {    
           logs.forEach(log => console.log(log.args)) 
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
