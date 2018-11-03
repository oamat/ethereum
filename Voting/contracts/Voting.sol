pragma solidity ^0.4.13;
// We have to specify what version of compiler this code will compile with

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */

  mapping (bytes32 => uint8) public votesReceived;  //Array con Votos recibidos para cada candidado en indices integer. 

  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */

  bytes32[] public candidateList; //lista de candidatos que cargaremos en método constructor

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  constructor (bytes32[] candidateNames) public {  //constructor que enviamos los candidatos
    candidateList = candidateNames;
  }

  // This function returns the total votes a candidate has received so far
  function totalVotesFor(bytes32 candidate) public view returns (uint8) {  //devuelve votos de un candidato
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForCandidate(bytes32 candidate) public {  //Votar un candidato
    emit logString("voteForCandidate");
    emit logBytes(candidate);
    require(validCandidate(candidate));
    votesReceived[candidate] += 1;
  } 

  // This function validates a candidate exists  

  function validCandidate(bytes32 candidate) public view returns (bool) {  //validar que un candidato existe.
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }

  /** FUNCIONES INFORMATIVAS, NO RELEVANTES */

    event logBytes(bytes32 _value);  //para escribir logs
    event logString(string _value);  //para escribir logs

    function obtenerDireccionContrato() public view returns (address) {
        return address(this);
        
    }


}
