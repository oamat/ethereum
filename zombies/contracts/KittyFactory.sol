
pragma solidity >0.4.99 <0.6.0;

contract KittyFactory {

uint dnaDigits = 16; //digitos del dna
uint dnaModulus = 10 ** dnaDigits; //Modulo.

struct Kitty { //struct de un Kitty
    bool isGestating;
    bool isReady;
    uint256 cooldownIndex;
    uint256 cooldownEndBlock;
    uint256 nextActionAt;
    uint256 siringWithId;
    uint256 birthTime;
    uint256 matronId;
    uint256 sireId;
    uint256 generation;
    uint256 genes;
    string name;
    string animalType;
    } //Automáticamente se genera la 'function Kitty(isGestarting) external view returns struct' por ser public.

Kitty[] public kitties; //Array dinámico de N struct Kitty
    //Automáticamente se genera la 'function kitties() external view returns Kitty[]' por ser public.
        //pero Al ser un array de structs nos dará problemas si externamente queremos que nos devuelva el Array o un Struct.


event NewKitty(uint kittyId, string name, uint dna, string animalType); // declara un evento del nuevo kitty

//**PUBLIC FUNCTIONS**//

  function getKitty(uint256 _id) external view returns (
    bool isGestating,
    bool isReady,
    uint256 cooldownIndex,
    uint256 nextActionAt,
    uint256 siringWithId,
    uint256 birthTime,
    uint256 matronId,
    uint256 sireId,
    uint256 generation,
    uint256 genes,
    string memory name,
    string memory animalType
  ) {
    Kitty storage kit = kitties[_id];

    // si esta variable es 0 entonces no se esta gestando
    isGestating = (kit.siringWithId != 0);
    isReady = (kit.cooldownEndBlock <= block.number);
    cooldownIndex = uint256(kit.cooldownIndex);
    nextActionAt = uint256(kit.cooldownEndBlock);
    siringWithId = uint256(kit.siringWithId);
    birthTime = uint256(kit.birthTime);
    matronId = uint256(kit.matronId);
    sireId = uint256(kit.sireId);
    generation = uint256(kit.generation);
    genes = kit.genes;
    name = kit.name;
    animalType = kit.animalType;
  }


  function getCount() public view returns (uint count) { //Devolvemos el tamaño del array
        return kitties.length;
    }

  function createRandomKitty(string memory _name) public {
        uint randDna = _generateRandomDna(_name);
        randDna = randDna - randDna % 100;
        _createKitty(_name, randDna);
    }

//**PRIVATE FUNCTIONS**//
 function _createKitty(string memory _name, uint _dna) internal {
        uint id = kitties.push(Kitty(true,true,0,0,0,0,0,0,0,0,_dna,_name,"kitty")) - 1;
        emit NewKitty(id, _name, _dna,"kitty");
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

}