pragma solidity >0.4.99 <0.6.0;

import "./Controller.sol"; //controlador
import "./Owned.sol"; //Propietario
import "./Token.sol"; //Tokens

contract ICO is Owned, Controller {
  //ICO es el controlador y propietario, tiene el método proxypayment y permite que des del token "controlado" se pueda avisar a ICO para que haga operación.

    uint256 constant public limit = 100 ether; //limite de inversión por address de 100Eth
    uint256 constant public exchange = 2; //número de tokens que voy a dar por 1 ether
    uint256 public totalCollected; //sumará todas las aportaciones de los tokenholders (compradores)
    address constant private address0 = address(uint160(0));

    Token public token; //contract Token
    address payable public ICOAccount; //dirección de la ICO, irán todos los Ethers pagados

    constructor() public {
        owner = msg.sender; //no haría falata, por que lo tenemos en la herencia Owned.
        totalCollected = 0;
    }

    modifier initialized() { // modificador para comprobar que la ICO se ha inicializado
        require(address(token) != address0,"ERROR: ICO doesn't initialize");
        _;
    }

    function initialize ( address payable _token, address payable _icoAccount) public  {
        require(address(token) == address0,"ERROR: ICO was initialized"); //comprobamos que no se inicializa más de una vez
        token = Token(_token); //creamos Token con dirección que nos dan
        require(token.totalTokensSupply() == 0,"ERROR: This Token is in use"); //comprobamos datos a 0, que no sea token usado
        require(token.controller() == address(this),"ERROR: Address must to be owner address"); //controller debe ser la address owner (ICO)
        ICOAccount = _icoAccount; //Cuenta destino de Ethers de la ICO
    }

    function proxyPayment(address _th) public payable initialized returns (bool) { //método de compra
        return doBuy(_th, msg.value); // llamo al método doBuy por que
    }

    function doBuy(address _sender, uint _value) public returns (bool) { // función de compra
        uint256 tokensGenerated = _value * exchange;  // calculamos cuantos tokens hay que generar (exchange és el número tokens por ether)
        require (totalCollected + _value <= limit,"ERROR: the Limit has been overcome");
                // evaluamos que no superemos el límite, si nos pasamos bloqueamos
        assert(token.generateTokens(_sender, tokensGenerated)); //se generan los tokens pedidos
        ICOAccount.transfer(_value); // se transfiere los ethers que nos han pagado
        totalCollected = totalCollected + _value; //sumamos lo que se ha añadido
        return true;
    }


    //Método fallback, método vacío y payable que va cualquier transacción que envíen a este conrato y no al Token
    function() external payable {  //función que es fallback, se hace por si un usuario envía dinero a la address de la ICO
                                // en vez del Token, al final se llamará a proxypayment para aprovechar el pago. Así no se pierde.
        proxyPayment(msg.sender);
    }


    /** METODOS INFORMATIVOS */
    function obtenerDireccionContrato() public view returns (address) {
        return address(this);
    }

    function obtenerDireccionOwner() public view returns (address) {
        return address(owner);
    }

}
