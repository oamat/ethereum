BlockChain Bets & Arbitration Example application with Ethereum & Solidity. 
FrondEnt doesn't exist yet, you can only do the test so far.

****TEST: For Deploy and test application follow the instructions: 

start Ganache
truffle compile
truffle migrate --network ganache
truffle test .\test\[name].js
truffle test --network ganache  (truffle migrate is unnecessary)


**DEVELOPMENT short guide
I changed or created this files:
/truffle-config.js
/contracts/*
/migrations/2_deploy_contracts.js (we call constructor method in deploy);
/test/*

