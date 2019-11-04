/******  This code generates manual transactions: with web3js and ethereumjs-tx for interact with blockchain. 

 * IMPORTANt: With Ganache stasted , you need to change the private key of account[0]
 * 
 * use:
 *   node .\test\SimpleWeb3Transactions.js 
 * 
 * **  truffle test .\test\SimpleWeb3Transactions.js  (not work!!)
 * 
 * ****/

const Web3 = require('web3');  //web3 para conectar js con blockChain
const EthereumJS = require('ethereumjs-tx');		//modulo para transacciones

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
//var web3 = new Web3("ws://127.0.0.1:7545");
console.log("Using web3.version: " + web3.version);

// web3.eth.getAccounts(console.log);
// web3.eth.getCoinbase().then(console.log);

web3.eth.getAccounts().then(async (accounts) => {

   // console.log("Accounts.length :" + accounts.length);
   // console.log("Using accounts: " + accounts);

   const account0 = accounts[0];
   const account1 = accounts[1];
   let balance0 = await web3.eth.getBalance(account0);
   let balance1 = await web3.eth.getBalance(account1);
   let balance0Eth = web3.utils.fromWei(balance0, "ether") + " ether";
   let balance1Eth = web3.utils.fromWei(balance1, "ether") + " ether";

   /************Crear TRANSACCIÓN SIMPLE, pasamos 5 Ethers de la cuenta 0 a la cuenta 1 **********/
   var trans1 = { from: account0, to: account1, value: web3.utils.toWei(web3.utils.toBN(5), 'ether') }
   var ResultTrans1 = await web3.eth.sendTransaction(trans1);
   //console.log("transaction hash = " + trans);
   console.log("");
   console.log("***************************TRANSACCIÓN 1 Web3 : web3.eth.sendTransaction *******************************");
   console.log("TRANSACCIÓN 1:" + JSON.stringify(trans1)); // La transacción realizada
   console.log("ACCOUNT 0: " + account0 + " . Había : " + balance0Eth + " y  despues : " + web3.utils.fromWei(await web3.eth.getBalance(account0), "ether"));
   console.log("ACCOUNT 1 " + account1 + " . Había : " + balance1Eth + " despues = " + web3.utils.fromWei(await web3.eth.getBalance(account1), "ether"));
   console.log("RESULTADO TRANSACCIÓN 1:" + JSON.stringify(ResultTrans1)); // La transacción realizada



   /************GENERAR TRANSACCIÓN PREVIA, FIRMARLA PARA ENVIAR LUEGO **********/
   balance0Eth = await web3.utils.fromWei(balance0, "ether") + " ether";
   balance1Eth = await web3.utils.fromWei(balance1, "ether") + " ether";

   var transactionCount = await web3.eth.getTransactionCount(account0); //Transaction count para calculo nonce
   var nonceHex = web3.utils.toHex(transactionCount);  //el nonce que toca en Hex
   //console.log("nonce = " + nonceHex);

   const EthereumTx = EthereumJS.Transaction
   const privateKey = Buffer.from(
      'c504524c68418adf68c15778d84558e647b8365c7cda7b64f4473632f3653fba', //private key de la account0 de Ganache.
      'hex',
   )

   const txParams = {
      nonce: nonceHex,
      gasPrice: '0x09184e72a000', //web3.utils.toHex(20000000000)
      gasLimit: '0x271000', //web3.utils.toHex(21000)
      to: account1,
      value: web3.utils.toHex(web3.utils.toWei(web3.utils.toBN(5), 'ether')),
      data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
   }


   console.log("");
   console.log("***************************TRANSACCIÓN 2 FIRMADA Web3/ethereumjs-tx: web3.eth.sendSignedTransaction *******************************");
   console.log("TRANSACCIÓN 2 a realizar =" + JSON.stringify(txParams)); // La transacción que vamos a realizar 
   // The second parameter is not necessary if these values are used
   const tx = new EthereumTx(txParams);  //new EthereumTx(txParams, { chain: 'mainnet', hardfork: 'petersburg' })
   tx.sign(privateKey); //Firmamos con buffer private key hexadecimal
   //const serializedTx = tx.serialize()
   //console.log("serializedTx =" + serializedTx);  //Son los datos de nuestra transacción firmados con la private key

   var txToSend = '0x' + tx.serialize().toString('hex');   //Si serializamos obtenemos la transacción firmada cpm pkey: hay que añadir “0x”.
   //console.log("txToSend =" + txToSend);  //Son los datos de nuestra transacción firmados con la private key

   var transR = await web3.eth.sendSignedTransaction(txToSend, async (error, transactionHash) => {
      if (error) console.log(error);
   }).on('receipt', (receipt) => {
      console.log("RESULTADO TRANSACCIÓN 2:" + JSON.stringify(receipt)); // La transacción realizada
   });   //Enviando transacción al server BlockChain

   console.log("ACCOUNT 0: " + account0 + " . Había : " + balance0Eth + " y  despues : " + web3.utils.fromWei(await web3.eth.getBalance(account0), "ether"));
   console.log("ACCOUNT 1 " + account1 + " . Había : " + balance1Eth + " despues = " + web3.utils.fromWei(await web3.eth.getBalance(account1), "ether"));


});
