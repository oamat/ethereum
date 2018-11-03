// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import voting_artifacts from '../../build/contracts/Voting.json'
// Voting is our usable abstraction, which we'll use through the code below.
var Voting = contract(voting_artifacts);

// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
var contractInstance = Voting.at('0xf25186b5081ff5ce73482ad761db0eb0d25abfbf'); //hay que copiar la address del contrato Voting deployado. 
var candidates = { "Eva": "option-1", "Uri": "option-2", "Pep": "option-3" };

window.App = {
  start: function () {
    var self = this;
    Voting.setProvider(web3.currentProvider);
    Voting.defaults({ from: web3.eth.coinbase });
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("there was an error fetching your accounts.");
        return;
      }
      if (accs.length == 0) {
        alert("No accounts");
        return;
      }
    });
    self.refreshAllCandidate();
  },

  voteForCandidate: function (message) {
    var self = this;
    var candidateName = $("#candidate").val();
    if (self.validateCandidate(candidateName)) {
      console.log("candidateName = " + candidateName);
      var address = web3.eth.coinbase;
      console.log("web3.eth.coinbase = " + web3.eth.coinbase);
      var voted = contractInstance.voteForCandidate(candidateName, {
        from: address,
        gasPrice: web3.toHex(2000000),
        gasLimit: web3.toHex(21000)
      });
      console.log("voted executed = " + voted);
      self.refreshCandidate(candidateName);
      console.log("Refreshing candidates ");
    } else {
      alert("this candidate doesn't exist, try again.");
      console.warn("this candidate doesn't exist, try again. ");
    }
  },
  refreshCandidate: function (candidateName) {
    let div_id = candidates[candidateName];
    var totalVotesPromise = contractInstance.totalVotesFor.call(candidateName);
    totalVotesPromise.then(votes => $("#" + div_id).html(votes.toString()));
  },
  validateCandidate: function (candidate)  {
    var self = this;
    var candidateNames = Object.keys(candidates);
    for (var i = 0; i < candidateNames.length; i++) {
      if (candidateNames[i] == candidate) {
        return true;
      }
    }
    return false;
  },
  refreshAllCandidate: function () {
    var self = this;
    var candidateNames = Object.keys(candidates);
    for (var i = 0; i < candidateNames.length; i++) {
      let candidateName = candidateNames[i];
      self.refreshCandidate(candidateName);
    }
  },
  connectDirectly: async function () {
    var self = this;
    console.warn("HTTPProvider. Falling back to http://localhost:7545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    window.web3 = await new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    document.getElementById('MetaMaskButton').disabled = true;
    document.getElementById('DirectlyButton').disabled = true;
    document.getElementById('voteLink').disabled = false;
    document.getElementById('refreshLink').disabled = false;
    //$('voteLink').attr("disabled", "false");
    //$('#voteLink').attr("disabled", "false");
    self.start();
  }
  ,
  connectByMetamask: async function () {

    var self = this;
    if (typeof web3 !== 'undefined') {
      console.warn("Using web3 detected from external source. If you find that your accounts don't appear, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(web3.currentProvider);
    } else {
      console.warn("No Metamask Provider detected. Connect to HTTPProvider: Falling back to http://localhost:7545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }
    document.getElementById('MetaMaskButton').disabled = true;
    document.getElementById('DirectlyButton').disabled = true;
    document.getElementById('voteLink').disabled = false;
    document.getElementById('refreshLink').disabled = false;
    //$('voteLink').attr("disabled", "false");
    //$('#voteLink').attr("disabled", "false");
    self.start();
  }

};


window.addEventListener('load', function () {
  //alert('You must to choose an option: connect to BlockChain by MetaMask(need start the plugin) or Directly (HTTPProvider)'); 
  document.getElementById('voteLink').disabled = true;
  document.getElementById('refreshLink').disabled = true;
  //$('voteLink').attr("disabled", "true");
  //$('#voteLink').attr("disabled", "true");
});


/*
$(document).ready(function() {
  $('#voteLink').click(function(e) {
    if (typeof web3 !== 'undefined') {
      return true;
    } else {
      alert('You must to choose an option: connect to BlockChain by MetaMask(need start the plugin) or Directly (HTTPProvider)');
      e.preventDefault();
      return false;
    }
  });
});
*/

