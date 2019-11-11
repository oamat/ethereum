# BlockChain Bets & Arbitration application with Ethereum & Solidity. 
    FrondEnt doesn't exist yet, you can only do the test so far.

## Stack
Solidity Code's use pragma solidity >0.4.99 <0.6.0;
We use truffle suite (truffle & Ganache)
Test with Web3 Transaction against Ganache

## install
You need to install geth from https://geth.ethereum.org/downloads/  
    & ganache from https://www.trufflesuite.com/
clone repository and execute : npm install

The better opcion is install the node modules globally. 

*we call constructor method in deploy /migrations/2_deploy_contracts.js
*we need .solhint.json beeecause we use assembly in Solidity. 

## Steps
start Ganache
truffle compile
truffle migrate --network ganache  (!!Copy&paste contract address to zombieFactory.js)

truffle test .\test\[name].js  (or truffle test)
truffle test --network ganache  (truffle test .\test\[name].js)






