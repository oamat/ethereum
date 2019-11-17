# Zombie game in Solidity Ethereum

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

## Steps
start Ganache
truffle compile

truffle migrate --network ganache  (!! you can Copy&paste contract address for "src" codes)
                    Only need migrate for "src/codes", not for truffle test because in truffle test we deploy contracts. 

truffle test --network ganache    (for execute all test, you don't need address contract because we deploy new contracts)
or 
truffle test .\test\zombieFactorySimple.js --network ganache 
truffle test .\test\zombieFeeding.js --network ganache  





node .\src\zombieFactorySimple.js    (as a posible frontEnd or BE, you need the address contract,Copy&paste contract address )




