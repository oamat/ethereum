
/******  With Ganache stasted 
 * 
 * use:
 *   node .\test\SimpleWeb3Transactions.js 
 * Or
 *   truffle test .\test\SimpleWeb3Transactions.js
 * 
 * ****/

const Web3 =  require('web3');  //web3 para conectar js con blockChain
var EthTxh = require('ethereumjs-tx');		//modulo para transacciones

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

console.log("web3.eth.getAccounts =" + web3.eth.getAccounts);
console.log("web3.eth.accounts[0] = " + web3.eth.accounts[0]);
console.log("web3.eth.accounts[1] = " + web3.eth.accounts[1]);
console.log( " getBalance accounts[0] = " +  web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]),"ether").toNumber());
console.log( " getBalance accounts[1] = " +  web3.fromWei(web3.eth.getBalance(web3.eth.accounts[1]),"ether").toNumber());

var account0 = web3.eth.accounts[0];
var account1 = web3.eth.accounts[1];


/************Crear TRANSACCIÓN SIMPLE **********/
var trans = web3.eth.sendTransaction( { from: account0, to: account1, value: web3.toWei(1,"ether")} );
console.log("transaction hash = " + trans);
console.log("Gettransaction = " + JSON.stringify(web3.eth.getTransaction(trans) )     ); // La transacción realizada
console.log( " getBalance accounts[0] = " +  web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]),"ether").toNumber());
console.log( " getBalance accounts[1] = " +  web3.fromWei(web3.eth.getBalance(web3.eth.accounts[1]),"ether").toNumber());

/************GENERAR TRANSACCIÓN PREVIA, FIRMARLA PARA ENVIAR LUEGO **********/
var pkey = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3';  //private key de la account0 de Ganache.
var pkeyHex = new Buffer(pkey,'hex');              //creamos un buffer con private key en hexadecimal
var nonceHex = web3.toHex(web3.eth.getTransactionCount(account0));  //el nonce que toca en Hex
console.log("nonce = " + nonceHex);

var trans = { nonce: nonceHex,                  
                 to: account1,                   
                 gasPrice: web3.toHex(20000000000), 
                 gasLimit: web3.toHex(21000),
                 value: web3.toHex(web3.toWei(5, 'ether')),
                 data: '' }  //Creamos la transacción des de 0:

console.log("trans String =" + trans);

var txRaw = new EthTxh(trans);  //Nueva ethereum transacción, usamos ethereumjs-tx
txRaw.sign(pkeyHex);   //Firmamos con buffer private key hexadecimal
var txSer = '0x' + txRaw.serialize().toString('hex');  //Si serializamos obtenemos la transacción firmada cpm pkey: hay que añadir “0x”.

console.log("txSer =" + txSer);  //Son los datos de nuestra transacción firmados con la private key

var transR =  web3.eth.sendRawTransaction(txSer , (error, hash) => { 
                if (!error) {
                   console.log("transaction hash = " + hash);
                   console.log( " getBalance accounts[0] = " + web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]),"ether").toNumber());
                   console.log( " getBalance accounts[1] = " + web3.fromWei(web3.eth.getBalance(web3.eth.accounts[1]),"ether").toNumber());
                   console.log("Gettransaction = " + JSON.stringify(web3.eth.getTransaction(hash))  ); // La transacción realizada
                } else {
                   console.log(error);
                } 
             }
           );   //Enviando transacción al server BlockChain

