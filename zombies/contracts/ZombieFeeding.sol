pragma solidity >0.4.99 <0.6.0;

import "./ZombieFactory.sol";
import "./KittyInterface.sol";

contract ZombieFeeding is ZombieFactory {
  //solamente hay que compilar ZombieFeeding — debido a que este contrato es nuestro contrato final que hereda de ZombieFactory
        //ZombieFactory no es necesario.

address owner;
KittyInterface kittyContract;

//**CONSTRUCTOR METHOD**//
  constructor(address _ckAddress) public { //Se va a decidir la interace
        owner = msg.sender; // sólo el owner podrà decidir cambiar la address
        address ckAddress = _ckAddress;
        kittyContract = KittyInterface(ckAddress);
     }


//**PUBLIC FUNCTIONS**//
  function feedOnKitty(uint _zombieId, uint _kittyId) public {
    uint kittyDna;
    string memory name;
    (,,,,,,,,,kittyDna, name) = kittyContract.getKitty(_kittyId);
    feedAndMultiply(_zombieId, kittyDna, name, "kitty");
  }

//**PRIVATE FUNCTIONS**//
 function feedAndMultiply(uint _zombieId, uint _targetDna, string memory _kittyName, string memory _species) private {
    require(msg.sender == zombieToOwner[_zombieId], " Address request must be one of the owners.");
    Zombie storage myZombie = zombies[_zombieId];
    uint newDna = _targetDna % dnaModulus;
    newDna = (myZombie.dna + newDna) / 2;
    if (keccak256(abi.encodePacked(_species)) == keccak256("kitty")) {
       newDna = newDna - newDna % 100 + 99; //queremos reemplazar los últimos 2 dígitos del ADN con 99
    }
    string memory newName = stringConcat(myZombie.name,"."); //generamos nuevo nombre
    newName = stringConcat(newName,_kittyName);
    _createZombie(newName, newDna);
  }

//**INTERNAL PURE FUNCTIONS**//
  //This function concatenates 2 strings
  function stringConcat(string memory first, string memory second) internal pure returns (string memory name){
    bytes memory _ba = bytes(first);
    bytes memory _bb = bytes(second);
    string memory _length = new string(_ba.length + _bb.length);
    bytes memory _bytes = bytes(_length);
    uint k = 0;
    for (uint i = 0; i < _ba.length; i++) _bytes[k++] = _ba[i];
    for (uint j = 0; j < _bb.length; j++) _bytes[k++] = _bb[j];
    return string(_bytes);
}

}
