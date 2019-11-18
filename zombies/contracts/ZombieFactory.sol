pragma solidity >0.4.99 <0.6.0;

import "./Ownable.sol";

contract ZombieFactory is Ownable { // zombieFactory hereda Ownable.

    event NewZombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    mapping (uint => address) public zombieToOwner;
    mapping (address => uint) ownerZombieCount;

    function _createZombie(string memory _name, uint _dna) internal {
        uint id = zombies.push(Zombie(_name, _dna)) - 1;
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender]++;
        emit NewZombie(id, _name, _dna);
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomZombie(string memory _name) public {
        //require(ownerZombieCount[msg.sender] == 0, "The counter of this contract must not be 0.");
        uint randDna = _generateRandomDna(_name);
        randDna = randDna - randDna % 100;
        _createZombie(_name, randDna);
    }

    function getZombie(uint _index) public view returns (uint id, string memory name, uint dna) { //devuelve json con nombres definidos.
        return (_index, zombies[_index].name, zombies[_index].dna); //necesitamos devolver los struct así.
    }

    function getCount() public view returns (uint count) { //Devolvemos el tamaño del array
        return zombies.length;
    }

}
