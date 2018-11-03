BlockChain Voting Example application with Ethereum & Solidity. The FrontEnd is HTML + JQuery + web3

****RUN APPLICATION: For Deploy and test application follow the instructions: 

start Ganache
Configure MetaMask if you wish (localhost:7545 is Ganache RPC server)
truffle compile
truffle test
truffle migrate  (you can copy the address and modify app.js if is necessary)
npm run dev



**DEVELOPMENT short guide
I used truffle unbox webpack, I changed or created this files:
/truffle.js
/contracts/Voting.sol
/migrations/2_deploy_contracts.js (we call constructor method in deploy);
/app/index.html
/app/javascripts/app.js  (you must to write the correct Voting CONTRACT ADDRESS!!)
/test/Voting.js