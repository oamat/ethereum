pragma solidity >0.4.99 <0.6.0;

// esta Interface permite a un contrato diferente: ZombieFeeding llamar al contrato Kitty
contract KittyInterface {
 function getKitty(uint256 _id) external view returns (
    bool isGestating,
    bool isReady,
    uint256 cooldownIndex,
    uint256 nextActionAt,
    uint256 siringWithId,
    uint256 birthTime,
    uint256 matronId,
    uint256 sireId,
    uint256 generation,
    uint256 genes,
    string memory name
  );
}