pragma solidity >0.4.99 <0.6.0;

contract PayableContract{
    string message;
    uint value;
    address sender;
    address coinbase;
    uint difficulty;
    uint gaslimit;
    uint number;
    uint256 gasLeft;
    bytes data;
    bytes4 sig;
    uint rightNow;
    uint gasprice;


    constructor() public {
        message = "Are you ready?";
    }

    event log(uint value, address sender, address coinbase, uint difficulty, uint gaslimit, uint number,
    uint256 gasLeft, bytes data, bytes4 sig, uint rightNow, uint gasprice );  //para escribir logs

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
        rightNow = block.timestamp;
        gasprice = tx.gasprice;

        emit log(value,  sender, coinbase, difficulty, gaslimit, number, gasLeft, data, sig, rightNow, gasprice);
    }

    function setGreetings(string memory _message) public {
        message = _message;
    }

    function getGreetings() public view returns (string memory) {
        return message;
    }
}
