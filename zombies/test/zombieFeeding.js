// zombieFeeding.sol contract to be tested
/******  With Ganache started 
 * 
 * use:
 *   truffle test .\test\zombieFeeding.js
 * 
 * ****/




//Recuperar Id de zombie y id de un kitty creados
//ZombieFeeding.feedOnKitty(zombieId, kittyId)
const assert = require('chai').assert;

var ZombieFeeding = artifacts.require("ZombieFeeding"); //la manera de instanciar de truffle. 
var KittyFactory = artifacts.require("KittyFactory"); //Necesitamos la dirección de kittyFactory para instanciar ZombieFeeding 


contract("ZombieFeeding", async (accounts) => {  // los accounts son los de la red, podemos coger el wallet que queramos de la red 

    const from = accounts[0]; // account0
    var zombieFeeding;
    var kittyFactory;
    var transaction;

    it("Create New zombieFeeding Smart Contract with truffle.", async () => { //Se crea el contato en ganache 
        //Primero debemos Crear contrato Kitty
        // Crear contrato ZombieFeeding con cotract address de Kitty en constructor

        kittyFactory = await KittyFactory.new();
        assert.typeOf(kittyFactory.address, 'string', "zombieFeeding.address is a string");
        assert.lengthOf(kittyFactory.address, 42, 'zombieFeeding.address has a length of 48');
        console.log("NEW Contract zombieFeeding.address = " + kittyFactory.address);

        zombieFeeding = await ZombieFeeding.new(kittyFactory.address); // mejor siempre crear uno nuevo. con address nueva
        assert.typeOf(zombieFeeding.address, 'string', "zombieFeeding.address is a string");
        assert.lengthOf(zombieFeeding.address, 42, 'zombieFeeding.address has a length of 48');
        console.log("NEW Contract zombieFeeding.address = " + zombieFeeding.address);
        //console.log(zombieFeeding);
    });



    it("Create 3 Kitties with createRandomKitty(name) method.", async () => {
        //debemos crear 3 kitty, pues ZombieFeeding necesita kitty para alimentar zombies. 
        //generar 3 kitty : kitty0, kitty1, kitty2 

        transaction = await kittyFactory.createRandomKitty("kitty0");
        assert.lengthOf(transaction.tx, 66, 'transaction.tx has a length of 66');
        console.log("transactionHash del primer kitty :" + transaction.tx);

        transaction = await kittyFactory.createRandomKitty("kitty1");
        assert.lengthOf(transaction.tx, 66, 'transaction.tx has a length of 66');
        console.log("transactionHash del segundo kitty :" + transaction.tx);

        transaction = await kittyFactory.createRandomKitty("kitty2");
        assert.lengthOf(transaction.tx, 66, 'transaction.tx has a length of 66');
        console.log("transactionHash del tercer kitty :" + transaction.tx);


    });


    it("Watch Last Events in createRandomKitty(name) method", () => { //escribimos logs de contract (event)
        assert.equal(transaction.logs.length, 1, "should have received one event");
        assert.equal(transaction.logs[0].event, "NewKitty", "event name should be NewKitty");
        assert.equal(transaction.logs[0].args.kittyId, 2, "id must be 2");
        assert.equal(transaction.logs[0].args.name, "kitty2", "seller must be kitty2");
        assert.notEqual(transaction.logs[0].args.dna, 0, "article name must be not equal to 0");
    });

    it("Create 3 Zombie with createRandomZombie(name) method.", async () => {
        //Podemos llamar a métodos de ZombieFactory, pues ZombieFeeding hereda de zombieFactory. 
        //generar 3 zombies : zombie0, zombie1, zombie2

        transaction = await zombieFeeding.createRandomZombie("zombie0");
        assert.lengthOf(transaction.tx, 66, 'transaction.tx has a length of 66');
        console.log("transactionHash del primer Zombie :" + transaction.tx);

        transaction = await zombieFeeding.createRandomZombie("zombie1");
        assert.lengthOf(transaction.tx, 66, 'transaction.tx has a length of 66');
        console.log("transactionHash del segundo Zombie :" + transaction.tx);

        transaction = await zombieFeeding.createRandomZombie("zombie2");
        assert.lengthOf(transaction.tx, 66, 'transaction.tx has a length of 66');
        console.log("transactionHash del tercer Zombie :" + transaction.tx);


    });

    it("Watch Last Events in createRandomZombie(name) method", () => { //escribimos logs de contract (event)
        assert.equal(transaction.logs.length, 1, "should have received one event");
        assert.equal(transaction.logs[0].event, "NewZombie", "event name should be NewZombie");
        assert.equal(transaction.logs[0].args.zombieId, 2, "id must be 2");
        assert.equal(transaction.logs[0].args.name, "zombie2", "seller must be zombie2");
        assert.notEqual(transaction.logs[0].args.dna, 0, "article name must be not equal to 0");
    });



    it("Kitty getCount() and getKitty(_id) method.", async () => {
        //llamaremos a ZombieFeeding para alimentar al Zombie con id=2, con el kitty id=2. 
           //Generará un nuevo Zombie con id nuevo.
           //Podemos llamar a métodos de ZombieFactory por que zombieFeeding hereda
        let kittiesCount = await kittyFactory.getCount();
        assert.equal(kittiesCount, 3, 'kitties creted must to be 3');
        console.log("kitties total :" + kittiesCount );
        console.log( await kittyFactory.getKitty(2) );
     
    });



    it("Feeding last Zombie(2) with the last Kitty(2): feedOnKitty(zombieId, kittyId) method.", async () => {
        //llamaremos a ZombieFeeding para alimentar al Zombie con id=2, con el kitty id=2. 
           //Generará un nuevo Zombie con id nuevo.
           //Podemos llamar a métodos de ZombieFactory por que zombieFeeding hereda
        let zombiesCount = await zombieFeeding.getCount();
        assert.equal(zombiesCount, 3, 'zombies creted must to be 3');
        console.log("zombies total before feedOnKitty :" + zombiesCount );
        console.log( await zombieFeeding.getZombie(2) );

        transaction = await zombieFeeding.feedOnKitty(2, 2);
        assert.lengthOf(transaction.tx, 66, 'transaction.tx has a length of 66');
        console.log("transactionHash del nuevo zombie :" + transaction.tx);
        
        zombiesCount = await zombieFeeding.getCount();
        assert.equal(zombiesCount, 4, 'zombies creted must to be 4');
        console.log("zombies total after feedOnKitty :" + zombiesCount );
        console.log( await zombieFeeding.getZombie(3) );
    });


});