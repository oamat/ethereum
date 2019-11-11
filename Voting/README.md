
# Voting in Solidity Ethereum

## Stack
Solidity Code's use pragma solidity >0.4.99 <0.6.0;
We use truffle suite (truffle & Ganache)
Test with Web3 Transaction against Ganache

## install
You need to install geth from https://geth.ethereum.org/downloads/  
    & ganache from https://www.trufflesuite.com/
clone repository and execute : npm install

The better opcion is install the node modules globally. 

## Steps
start Ganache
truffle compile
truffle migrate --network ganache  (!!Copy&paste contract address to zombieFactory.js)

node .\src\zombieFactory.js    (as a posible frontEnd or BE, you need the address contract)

truffle test .\test\zombieFactory.js --network ganache   (typical basic test, you don't ned address contract)

I used truffle unbox webpack, I changed or created this files:
/truffle.js
/contracts/Voting.sol
/migrations/2_deploy_contracts.js (we call constructor method in deploy);
/app/index.html
/app/javascripts/app.js  (you must to write the correct Voting CONTRACT ADDRESS!!)
/test/Voting.js







