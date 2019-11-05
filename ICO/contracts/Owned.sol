pragma solidity >0.4.99 <0.6.0;

//este contrato valida que sólo pueda ejecutar transacciones el owner.
/// @dev `Owned` is a base level contract that assigns an `owner` that can be
///  later changed
contract Owned {
    address payable public owner;
    address payable public newOwner;

    /// @notice The Constructor assigns the message sender to be `owner`
    constructor() public {
        owner = msg.sender;
    }

    /// @dev `owner` is the only address that can call a function with this
    /// modifier
    modifier onlyOwner() {
        require(msg.sender == owner, " ERROR: sender is different than owner");
        _;
    }
 
    /// @notice `owner` can step down and assign some other address to this role
    /// @param _newOwner The address of the new owner. 0x0 can be used to create
    ///  an unowned neutral vault, however that cannot be undone
    function changeOwner(address payable _newOwner) public onlyOwner {
        newOwner = _newOwner;
    }


    function acceptOwnership() public {
        if (msg.sender == newOwner) {
            owner = newOwner;
        }
    }
}
