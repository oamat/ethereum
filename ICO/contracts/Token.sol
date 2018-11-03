pragma solidity ^0.4.13;

import "./Controlled.sol";
import "./Controller.sol";

contract Token is Controlled { //El contrato token está controlado por alguien, en este caso por ICO
//Cada vez que se pida comprar Tokens este contrato se lo debe consultar a la ICO si se puede comprar.
    mapping (address => uint256) balances; //cantidad de tokens por dirección (compradores), 
    uint256 public totalTokensSupply; //contador total de todos los tokens generados (ERC20)

    constructor() public { // el que llame será el controlador (debeía ser ICO ico.address).
        controller = msg.sender;
    }

    //LOG para transfers
    event TransferLog (address indexed _from, address indexed _to, uint256 _value);

    //(ERC20) saber balance de todos los owner
    function balanceOf(address _owner) public view returns (uint256 balance) { //saber para un owner su balance (ERC20)
        if (balances[_owner] == 0) {
            return 0;
        } else {
            return balances[_owner];
      }
    }


    //(ERC20)transfiere  al ICO des de cuenta que llama al método (message sender es _from)  (ERC20)
    function transfer(address _to, uint256 _value) public returns (bool success) { 
        return doTransfer(msg.sender, _to, _value);  //se llama al método que realmente hace transfer
    }

    //(ERC20)transfiere  al ICO des de una cuenta _from que es enviada al ICO  (ERC20)
    function transferFrom(address _from, address _to, uint256 _value) public  onlyController returns (bool success) {  //(ERC20)
        return doTransfer(_from, _to, _value); //se llama al método que realmente hace transfer
    }

    function doTransfer (address _from, address _to, uint256 _value) internal returns (bool) {
        if (_value == 0) { //No hay nada que transferir
            return true;
        }
        require ((_to != 0) && (_to != address(this))); //destinatario no puede ser 0, ni el contrato Token
        uint previousBalanceFrom = balanceOf(_from); //recuperamos balance inicial del _from
        if (previousBalanceFrom < _value) { //comprobamos que el balance del from sea mayor que value, si es menor cancelamos transfer
            return false;
        }
        balances[_from] = balances[_from] - _value; //restamos al balance de _from el valor que se quiere transferir

        uint previousBalanceTo = balanceOf(_to); //recuperamos balance de _to
        require(previousBalanceTo + _value >= previousBalanceTo); //No queremos overflow, si ocurre se empieza de 0, lo comprobamos
                                                                  //comprobamos que el balance del _to + value no reinicie el int256
        balances[_to] = balances[_to] + _value; //sumamos al balance el valor de  _to
        emit TransferLog(_from, _to, _value); //sólo para saber quien lo ha realizado, log en event
    }

    function isContract(address _addr) view internal returns(bool) { //helper para comprobar si una address es un contrato.
        uint size;
        if (_addr == 0) return false;
        assembly {  
            size := extcodesize(_addr)  // comprueba si una dirección es un contrato.
        }
        
        return size>0;
    }

    //Método fallback, método vacío y payable que va cualquier transacción hacia una signature que no es ningún método existente
    function () public payable { //método fallback, va cualquier transacción que vaya a una signature inexistente
        require(isContract(controller)); // comprobamos que sea un contrato
        Controller c = Controller(controller); // llamamos constructor de controller con dirección controller nueva
        require(c.proxyPayment.value(msg.value)(msg.sender)); //llamamos método payable proxyPayment con value y contrato:
              //Fijarse que reenviamos el msg.value con '.value' aunque no esté como param del método, también contrato.
    }

    //genera los tokens necesarios, dependiendo del pago
    function generateTokens(address _owner, uint _tokensGenerated) public onlyController returns (bool) { 
        uint previousTotalTokensSupply = totalTokensSupply; //cogemos los tokens totales hasta el momento
        require(previousTotalTokensSupply + _tokensGenerated >= previousTotalTokensSupply); //validamos que no haya overflow int256, si ocurre se empieza de 0
        uint previousBalanceTo = balanceOf(_owner); //cogemos los tokens totales del Owner hasta el momento
        require(previousBalanceTo + _tokensGenerated >= previousBalanceTo); //validamos que no haya overflow int256, si ocurre se empieza de 0
        
        totalTokensSupply = previousTotalTokensSupply + _tokensGenerated;
        balances[_owner] = previousBalanceTo + _tokensGenerated;
        emit TransferLog(_owner, _owner, _tokensGenerated); //sólo para saber quien lo ha realizado, log en event
        return true;
    }

   

}
