pragma solidity ^0.4.18;

/* SMART CONTRACT de pruebas, que permite que un jugador1 realice una apuesta, 
que otro jugador2 acepte la apuesta y que gane alguien aleatoriamente.  */

contract Apuestas {
    
    enum Estado {sinApuesta, apuestaHecha, apuestaAceptada}
    Estado public estadoActual;
    uint public apostado;
    address public jugador1;
    address public jugador2;
    uint public numeroBloqueSemilla;
 
    constructor () public {
        estadoActual = Estado.sinApuesta; // asignamos estado inical
    }
         
    event log(string _value);  //para escribir logs

    modifier soloEstado (Estado estadoEsperado) {  //modifier lleva restricciones para functiones que lo pidan. 
        require(estadoEsperado == estadoActual); //Comprueba que el estado actual corresponda con esperado
        _;
    }
    
    function apostar() public soloEstado(Estado.sinApuesta) payable { //recibe from y value (payable), que irá a Apuestas address.
        apostado = msg.value;
        jugador1 = msg.sender;
        estadoActual = Estado.apuestaHecha; //cambiamos estado
    }
    
    function aceptarApuesta() public soloEstado(Estado.apuestaHecha) payable { //recibe from y value (payable), que irá a Apuestas address.
        require(msg.value == apostado);
        numeroBloqueSemilla = block.number;
        jugador2 = msg.sender;
        estadoActual = Estado.apuestaAceptada;
    }
    
   
    
    

    function resolverApuesta() public soloEstado(Estado.apuestaAceptada)  { //recibe from y value (payable), que irá a Apuestas address.
        uint256 bloque = uint256(blockhash(numeroBloqueSemilla)); 
        uint256 halfMaxValue = 57896044618651097711785492504343953926634992332820282019728792003956564819968; //mitad del màximo entero
        uint256 flip = uint256(uint256(bloque)/halfMaxValue);
        
        estadoActual = Estado.sinApuesta;
        if (flip == 0){
            emit log("Gana Jugador1");
            jugador1.transfer(address(this).balance);
        } else{
            emit log("Gana Jugador2");
            jugador2.transfer(address(this).balance);
        }
     
        
    }

    /** FUNCIONES INFORMATIVAS, NO RELEVANTES */

    function obtenerBalanceContrato() public view returns (uint) {
        return address(this).balance;
        
    }
    
    function obtenerBalanceJugador1() public view returns (uint) {
        return address(jugador1).balance;
        
    }

    function obtenerBalanceJugador2() public view returns (uint) {
        return address(jugador2).balance;
        
    }

    function obtenerDireccionContrato() public view returns (address) {
        return address(this);
    }
    
    function obtenerDireccionJugador1() public view returns (address) {
        return address(jugador1);
    }

    function obtenerDireccionJugador2() public view returns (address) {
        return address(jugador2);
    }
  
    function obtenerEstado() public view returns (string) {
        if(estadoActual == Estado.sinApuesta) return "sinApuesta";
        if(estadoActual == Estado.apuestaHecha) return "apuestaHecha";
        if(estadoActual == Estado.apuestaAceptada) return "apuestaAceptada";
    }

} 
 