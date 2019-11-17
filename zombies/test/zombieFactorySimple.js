// zombieFactorySimple.sol contract to be tested
/******  With Ganache started 
 * 
 * use:
 *   truffle test .\test\zombieFactorySimple.js
 * 
 * ****/
const assert = require('chai').assert;

var ZombieFactorySimple = artifacts.require("ZombieFactorySimple"); //la manera de instanciar de truffle. 


contract("ZombieFactorySimple", async (accounts) => {  // los accounts son los de la red, podemos coger el wallet que queramos de la red 

    const from = accounts[0]; // account0
    var zombieFactorySimple;
    var transaction;

    it("Create New zombieFactorySimple Smart Contract with truffle.", async () => { //Se crea el contato en ganache 
        zombieFactorySimple = await ZombieFactorySimple.new(); // mejor siempre crear uno nuevo. con address nueva
        assert.typeOf(zombieFactorySimple.address, 'string', "zombieFactorySimple.address is a string");
        assert.lengthOf(zombieFactorySimple.address, 42, 'zombieFactorySimple.address has a length of 48');
        console.log("NEW Contract zombieFactorySimple.address = " + zombieFactorySimple.address);
        //console.log(zombieFactorySimple);
    });

    it("Create 3 Zombie with createRandomZombie(name) method.", async () => { //crear un zombie
        transaction = await zombieFactorySimple.createRandomZombie("myName");
        assert.lengthOf(transaction.tx, 66, 'transaction.tx has a length of 66');
        console.log("transactionHash del primer Zombie :" + transaction.tx);

        transaction = await zombieFactorySimple.createRandomZombie("myName");
        assert.lengthOf(transaction.tx, 66, 'transaction.tx has a length of 66');
        console.log("transactionHash del primer Zombie :" + transaction.tx);

        transaction = await zombieFactorySimple.createRandomZombie("myName");
        assert.lengthOf(transaction.tx, 66, 'transaction.tx has a length of 66');
        console.log("transactionHash del primer Zombie :" + transaction.tx);


    });

    it("Watch Last Events in createRandomZombie(name) method", () => { //escribimos logs de contract (event)
        assert.equal(transaction.logs.length, 1, "should have received one event");
        assert.equal(transaction.logs[0].event, "NewZombie", "event name should be NewZombie");
        assert.equal(transaction.logs[0].args.zombieId, 2, "id must be 2");
        assert.equal(transaction.logs[0].args.name, "myName", "seller must be myName");
        assert.notEqual(transaction.logs[0].args.dna, 0, "article name must be not equal to 0");
    });

});