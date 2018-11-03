pragma solidity ^0.4.18;

/* SMART CONTRACT de pruebas, que permite realizar una compra y que este sea validado por un arbitro, 
o bien por el propio comprador, hasta entonces el dinero no irá al Vendedor */

contract CompraArbitrada {

    address public comprador;
    address public vendedor;
    address public arbitro;
        
    constructor ( address _vendedor, address _arbitro) public { //recibe quien es el comprador, vendedor y arbitro.
        comprador = msg.sender;
        vendedor = _vendedor;
        arbitro = _arbitro;
    }
           
    function compra()  public payable { //Recibe from y value (payable), value irá temporalmente a la dirección del contrato (smartContract).
        require (msg.sender == comprador);
    }

    function pagarAlVendedor() public { //Recibe from, transferirá al vendedor el dinero del contrato.
        if (msg.sender == comprador || msg.sender == arbitro){
            vendedor.transfer(address(this).balance);
        }
    }

    function devolverAlComprador() public { //Recibe from, devolverá al comprador el dinero del contrato.
        if (msg.sender == comprador || msg.sender == arbitro){
            comprador.transfer(address(this).balance);
        }
    }
    


/** FUNCIONES INFORMATIVAS, NO RELEVANTES */

    function obtenerBalanceContrato() public view returns (uint) {
        return address(this).balance;        
    }
    
    function obtenerBalanceComprador() public view returns (uint) {
        return address(comprador).balance;        
    }

    function obtenerBalanceVendedor() public view returns (uint) {
        return address(vendedor).balance;        
    }
    

    function obtenerDireccionContrato() public view returns (address) {
        return address(this);
    }
    
    function obtenerDireccionComprador() public view returns (address) {
        return address(comprador);
    }

    function obtenerDireccionArbitro() public view returns (address) {
        return address(arbitro);
    }

    function obtenerDireccionVendedor() public view returns (address) {
        return address(vendedor);
    }
    
}