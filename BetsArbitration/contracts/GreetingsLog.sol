pragma solidity >0.4.99 <0.6.0;

// SMART CONTRACT de pruebas, que permite hacer una transferencia con payableFunction()
// que irá directamente a coinbase por defecto
// y se lanza el evento logGreetings */

contract GreetingsLog {
    string message;
    uint value;
    address payable sender;
    address payable coinbase;
    uint difficulty;
    uint gaslimit;
    uint number;
    uint256 gasLeft;
    bytes data;
    bytes4 sig;
    uint rightNow;
    uint gasprice;

    event logGreetings(uint value, address sender, address coinbase, uint difficulty, uint gaslimit, uint number,
    uint256 gasLeft, bytes data, bytes4 sig, uint rightNow, uint gasprice );  //para escribir logs

    constructor() public {
        message = "Are you ready?";
    }

    function setGreetings(string memory _message ) public {
        message = _message;
    }

    function getGreetings() public view returns (string memory) {
        return message;
    }

    function getMyAddress() public view returns (address) {
        return address(this);
    }

    function payableFunction() public payable{
        value = msg.value;
        sender = msg.sender;
        coinbase = block.coinbase;
        difficulty = block.difficulty;
        gaslimit = block.gaslimit;
        number = block.number;
        gasLeft = gasleft();
        data = msg.data;
        sig = msg.sig;
        rightNow = block.number; //block.timestamp;
        gasprice = tx.gasprice;
    }

    function writeLog() public {
        emit logGreetings(value,  sender, coinbase, difficulty, gaslimit, number, gasLeft, data, sig, rightNow, gasprice);
    }

}
