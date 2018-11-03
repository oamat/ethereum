BlockChain Virtual Store Example application with Ethereum & Solidity.  The FrontEnd is HTML + JQuery + web3

## TEST: For Deploy and test application follow the instructions:

start Ganache

Configure MetaMask if you wish (localhost:7545 is Ganache RPC server)

truffle compile

truffle test

truffle migrate --network ganache 

npm run dev



## DEVELOPMENT short guide

1. I changed or created this files:
    
    truffle init

    /truffle.js
    
    /contracts/*
    
    /test/*
    
    /migrations/2_deploy_contracts.js (we call constructor method in deploy);
