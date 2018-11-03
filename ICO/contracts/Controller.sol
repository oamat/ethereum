pragma solidity ^0.4.13;

// Interfaz Controller for ICO
contract Controller {  // contrato controlador función proxy payment

    //este métodod recibira una dirección y es payable
    function proxyPayment(address _th) payable public returns (bool);  
}
