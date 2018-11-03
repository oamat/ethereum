pragma solidity ^0.4.18;

contract Ownable {
  // state variables
  address owner;

  // constructor
  constructor() public { 
    owner = msg.sender; //who creates contract in network is the owner
  }
  
  // modifiers
  modifier onlyOwner() {
    require(msg.sender == owner); //only owner can do
    _;
  }


}
