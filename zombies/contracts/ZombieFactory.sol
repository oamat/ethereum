pragma solidity >0.4.99 <0.6.0;

contract ZombieFactory {

    // declara nuestro evento aquí
    event NewZombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie { //struct de un Zombie
        string name;
        uint dna;
    } //Automáticamente se genera la 'function Zombie(_name, _dna) external view returns struct' por ser public.

    Zombie[] public zombies; //Array dinámico de struct Zombie
    //Automáticamente se genera la 'function zombies() external view returns Zombie[]' por ser public.
        //pero Al ser un array de structs nos dará problemas.

    function _createZombie(string memory _name, uint _dna) private returns (uint) {
        // memory hace una copia independiente de la variable en memoria y no soportaría .push
        uint id = zombies.push(Zombie(_name, _dna)) - 1; // usamos el metodo auto
        emit NewZombie(id, _name, _dna);
     }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomZombie(string memory _name) public returns (uint dna) {
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
        return randDna;
    }

    function getZombie(uint _index) public view returns (uint id, string memory name, uint dna) { //devuelve json con nombres definidos.
        return (_index, zombies[_index].name, zombies[_index].dna); //necesitamos devolver los struct así.
    }

    function getCount() public view returns (uint count) { //Devolvemos el tamaño del array
        return zombies.length;
    }

}
