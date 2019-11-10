# Zombie game in Solidity Ethereum

## Stack
Solidity Code's use pragma solidity >0.4.99 <0.6.0;
We use truffle suite (truffle & Ganache)
Test with Web3 Transaction against Ganache


## Steps
start Ganache
truffle compile
truffle migrate --network ganache
    !!Copy contract address of log and paste to zombieFactory.js

node .\src\zombieFactory.js    (as a posible frontEnd or BE)

truffle test .\test\zombieFactory.js --network ganache   (typical basic test)


