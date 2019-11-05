pragma solidity >0.4.99 <0.6.0;

// Interfaz Controller for ICO
contract Controller {  // contrato controlador función proxy payment

    //este métodod recibira una dirección y es payable
    function proxyPayment(address _th) external payable returns (bool);
}
