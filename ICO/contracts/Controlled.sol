pragma solidity ^0.4.13;

// Controlled for Token
//El contrato Token está controlado por alguien, en este caso por ICO
//Cada vez que se pida comprar Tokens este contrato se lo debe consultar a la ICO si se puede comprar.
contract Controlled { 
    address public controller;
    
    constructor() public {
        controller = msg.sender;
    }    
    
    modifier onlyController() {
        require (msg.sender == controller);
        _;
    }
 
    function changeController(address _newController) public onlyController { //nos permite cambiar el controlador  
        controller = _newController;
    }
}
