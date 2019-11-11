BlockChain ICO (Initial Coin Offering) Example application with Ethereum & Solidity. 
I use the standard  ERC20 for ETHEREUM tokens

FrontEnd doesn't exist yet, you can only do the test so far.

****TEST: For Deploy and test application follow the instructions: 

start Ganache
truffle compile
truffle migrate --network ganache
truffle test --network ganache (truffle migrate is unnecessary )



**DEVELOPMENT short guide
I changed or created this files:
truffle init
/truffle-config.js
/contracts/*
/test/*
/migrations/2_deploy_contracts.js (we call constructor method in deploy);


