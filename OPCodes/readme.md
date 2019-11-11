BlockChain OPCodes Example application with Ethereum & Solidity. 

FrontEnd doesn't exist yet, you can only do the test so far.

****TEST: For Deploy and test application follow the instructions: 

start Ganache
truffle compile
truffle migrate --network ganache
Copy & paste address contract in /test/*.js  (before truffle test...)
truffle test .\test\CallContract.js --network ganache



**DEVELOPMENT short guide
I changed or created this files:
truffle init
/truffle-config.js
/contracts/*
/test/*
/migrations/2_deploy_contracts.js (we call constructor method in deploy);


