BlockChain Bets & Arbitration Example application with Ethereum & Solidity. 
FrondEnt doesn't exist yet, you can only do the test so far.

****TEST: For Deploy and test application follow the instructions: 

start Ganache
truffle compile
truffle migrate --network ganache
truffle test .\test\[name].js
truffle test  (truffle migrate is unnecessary)


**DEVELOPMENT short guide
I changed or created this files:
/truffle.js
/contracts/Apuestas.sol
/contracts/CompraArbitrada.sol
/contracts/GreetingsLog.sol
/migrations/2_deploy_contracts.js (we call constructor method in deploy);
/test/Apuestas.js
/test/CompraArbitrada.js
/test/GreetingsLog.js
/test/SimpleWeb3Transactions.js  (test with web3 conection for frontEnd clients)
