pragma solidity >0.4.99 <0.6.0;

contract Ownable {
  // state variables
  address owner;

  // constructor
  constructor() public {
    owner = msg.sender; //who creates contract in network is the owner
  }

  // modifiers
  modifier onlyOwner() {
    require(msg.sender == owner, "ERROR: Only the owner can do this action."); //only owner can do
    _;
  }


}
