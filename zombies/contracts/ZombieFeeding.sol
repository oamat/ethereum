pragma solidity >0.4.99 <0.6.0;

import "./ZombieFactory.sol";
import "./KittyInterface.sol";

contract ZombieFeeding is ZombieFactory {
  //solamente hay que compilar ZombieFeeding — debido a que este contrato es nuestro contrato final que hereda de ZombieFactory
        //ZombieFactory no es necesario.

address owner;
KittyInterface kittyContract;


  constructor(address _ckAddress) public { //Se va a decidir la interace
        owner = msg.sender; // sólo el owner podrà decidir cambiar la address
        address ckAddress = _ckAddress;
        kittyContract = KittyInterface(ckAddress);
     }

  function feedAndMultiply(uint _zombieId, uint _targetDna, string memory _species) public {
    require(msg.sender == zombieToOwner[_zombieId], " Address request must be one of the owners.");
    Zombie storage myZombie = zombies[_zombieId];
    uint newDna = _targetDna % dnaModulus;
    newDna = (myZombie.dna + newDna) / 2;
    if (keccak256(abi.encodePacked(_species)) == keccak256("kitty")) {
       newDna = newDna - newDna % 100 + 99; //queremos reemplazar los últimos 2 dígitos del ADN con 99
    }
    _createZombie("NoName", newDna);
  }

  function feedOnKitty(uint _zombieId, uint _kittyId) public {
    uint kittyDna;
    (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
    feedAndMultiply(_zombieId, kittyDna, "kitty");
  }

}
