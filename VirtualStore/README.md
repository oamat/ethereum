 # BlockChain Virtual Store application (like Wallapop) with Ethereum & Solidity.  
    You can sell and buy in the website (http://localhost:3000/), change your account by Metamask. 

## Stack
Solidity Code's use pragma solidity >0.4.99 <0.6.0;
The FrontEnd is HTML + JQuery + web3
We use truffle suite (truffle & Ganache)
Test with Web3 Transaction against Ganache

## install
You need to install geth from https://geth.ethereum.org/downloads/  
    & ganache from https://www.trufflesuite.com/
clone repository and execute : npm install

The better opcion is install the node modules globally. 

*we call constructor method in deploy /migrations/2_deploy_contracts.js

## Steps
start Ganache

Configure MetaMask if you wish (localhost:7545 is Ganache RPC server)

truffle compile
truffle migrate --compile-all --reset --network ganache
truffle migrate --network ganache  (!!Copy&paste contract address to zombieFactory.js)
truffle test --network ganache   (typical basic test, you don't ned address contract)

with truffle test Automaticaly create ethereum net with Ganache-cli
$ truffle test .\test\ChainListHappyPath.js   
$ truffle test .\test\ChainListExceptions.js     

npm run dev   (you can go http://localhost:3000/)
