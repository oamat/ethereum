pragma solidity >0.4.99 <0.6.0;

// Controlled for Token
//El contrato Token está controlado por alguien, en este caso por una empresa que ofrece el ICO (initial coin offering - Oferta inicial de monedas)
//Cada vez que se pida comprar Tokens este contrato se lo debe consultar a la ICO si se puede comprar.
contract Controlled {
    address payable public controller;

    constructor() public {
        controller = msg.sender;
    }

    modifier onlyController() {
        require (msg.sender == controller, " ERROR: sender is different than controller");
        _;
    }

    function changeController(address payable _newController) public onlyController { //nos permite cambiar el controlador,
        //sólo lo puede hacer el actual controlador
        controller = _newController;
    }
}
