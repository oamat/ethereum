/******  This code call ZombieFactory.sol with web3js & interact with blockchain. 

 * IMPORTANt: With Ganache started , you need to change the ZombieFactory contract address.
 * 
 * use:
 *   node .\test\zombieFactory.js 
 * 
 * **  truffle test .\test\zombieFactory.js  (not work!!)
 * 
 * ****/

const Web3 = require('web3');  //web3 para conectar js con blockChain

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
console.log("Using web3.version: " + web3.version);



// Así es como accederiamos a nuestro contrato:
var fs = require('fs');
var path = "./build/contracts/ZombieFactory.json";
var json = JSON.parse(fs.readFileSync(path));
var abi = json.abi; /* abi generado por el compilador solc usando truffle */
var contractAddress = "0x310E6BD3CB00Fb8474C6B752684bcfe17ed6fc56"; /* nuestra dirección del contrato en Ethereum después de implementarlo */

var name = "MyNameOAF"; // a testing name





const init = async () => {

  var walletAddress = await web3.eth.getAccounts().then(async (accounts) => {
    return accounts[0];
  });
  console.log(walletAddress);

  var zombieFactory = await new web3.eth.Contract(abi, contractAddress);
  //console.log(zombieFactory);    //we need to use myContract.methods.myMethod().send() or -> myContract.methods.myMethod().send()

  //var zombiesArray = await zombieFactory.methods.zombie().send();
  //console.log(" FIRST  zombiesArray ZERO : " + zombiesArray.length);
  // Llama a la función `createRandomZombie` de nuestro contrato: genera un zombie aleatorio






  //zombieFactory.createRandomZombie(name);
  var dna = await zombieFactory.methods.createRandomZombie(name + "0").send({ from: walletAddress }, function (error, result) {
    if (error) console.log(error);
    return (result);
  });
  console.log("dna 1 = " + dna);

  dna = await zombieFactory.methods.createRandomZombie(name + "1").send({ from: walletAddress }, function (error, result) {
    if (error) console.log(error);
    return (result);
  });
  console.log("dna 2 = " + dna);

  dna = await zombieFactory.methods.createRandomZombie(name + "2").send({ from: walletAddress }, function (error, result) {
    if (error) console.log(error);
    return (result);
  });
  console.log("dna 3 = " + dna);



  var arraylength = await zombieFactory.methods.getCount().call({ from: walletAddress }, function (error, result) {
    if (error) console.log(error);
    return (result);
  });
  console.log("  array length= " + arraylength);


  var zombie1 = await zombieFactory.methods.getZombie(arraylength - 1).call({ from: walletAddress }, function (error, result) {
    if (error) console.log(error);
    return (result);
  });
  console.log("LAST:  zombie1.id = " + zombie1.id + " zombie1.name = " + zombie1.name + "  zombie1.dna = " + zombie1.dna);
  generateZombie(zombie1.id, zombie1.name, zombie1.dna);



  zombieFactory.events.NewZombie({ fromBlock: 0 }, function (error, event) {
    console.log(event);
  }).on('data', function (event) {
    console.log(event); // same results as the optional callback above
  }).on('changed', function (event) {
    console.log(event); // remove event from local database
  }).on('error', function (error) {
    console.log(error);
  });



}






// Recogemos el adn del zombi y actualizamos nuestra imagen
const generateZombie = async (id, name, dna) => {
  let dnaStr = String(dna)
  // rellenamos el ADN con ceros si es menor de 16 caracteres
  while (dnaStr.length < 16)
    dnaStr = "0" + dnaStr

  let zombieDetails = {
    // los primeros 2 dígitos hacen la cabeza. Tenemos 7 posibles cabezas, entonces hacemos % 7
    // para obtener un número entre 0 - 6, después le sumamos 1 para hacerlo entre 1 - 7. Tenemos 7
    // imagenes llamadas desde "head1.png" hasta "head7.png" que cargamos en base a 
    // este número:
    headChoice: dnaStr.substring(0, 2) % 7 + 1,
    // Los siguientes 2 dígitos se refieren a los ojos, 11 variaciones:
    eyeChoice: dnaStr.substring(2, 4) % 11 + 1,
    // 6 variaciones de camisetas:
    shirtChoice: dnaStr.substring(4, 6) % 6 + 1,
    // los últimos 6 digitos controlas el color. Actualiza el filtro CSS: hue-rotate
    // que tiene 360 grados:
    skinColorChoice: parseInt(dnaStr.substring(6, 8) / 100 * 360),
    eyeColorChoice: parseInt(dnaStr.substring(8, 10) / 100 * 360),
    clothesColorChoice: parseInt(dnaStr.substring(10, 12) / 100 * 360),
    zombieName: name,
    zombieDescription: "A Level 1 CryptoZombie",
  }
  return zombieDetails
}

init();