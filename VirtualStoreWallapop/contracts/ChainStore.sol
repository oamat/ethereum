pragma solidity >0.4.99 <0.6.0;

import "./Ownable.sol";

contract ChainStore is Ownable {
  // Var Article, custom type struct
  struct Article {
    uint id;
    address seller;
    address buyer;
    string name;
    string description;
    uint256 price;
  }

  // array with all articles
  mapping (uint => Article) public articles;
  uint articleCounter;

  //Log event sell
  event LogSellArticle(
    uint indexed _id,
    address indexed _seller,
    string _name,
    uint256 _price
  );

  //Log event buy
  event LogBuyArticle(
    uint indexed _id,
    address indexed _seller,
    address indexed _buyer,
    string _name,
    uint256 _price
  );

  // deletes contract from network
  function kill() public onlyOwner {
    selfdestruct(owner);
  }

  // sell an article
  function sellArticle(string memory _name, string memory _description, uint256 _price) public {
    // a new article has a new id, id is the last articleCounter.
    articleCounter++;

    // store this article in array-mapping
    articles[articleCounter] = Article(
      articleCounter,
      msg.sender,
      0x0,
      _name,
      _description,
      _price
    );

    emit LogSellArticle(articleCounter, msg.sender, _name, _price);  //log the sell Article
  }

  // fetch the number of articles in the contract
  function getNumberOfArticles() public view returns (uint) {
    return articleCounter;
  }

  // fetch and return all article IDs for articles still for sale
  function getArticlesForSale() public view returns (uint[] memory) {
    // prepare output array
    uint[] memory articleIds = new uint[](articleCounter);
          //The Ethereum Virtual Machine has three areas where it can store items.
          // The first is “storage”, where all the contract state variables reside. Every contract has its own storage and it is persistent between function calls and quite expensive to use.
          // The second is “memory”, this is used to hold temporary values. It is erased between (external) function calls and is cheaper to use.
          // The third one is the stack, which is used to hold small local variables. It is almost free to use, but can only hold a limited amount of values.
          // For almost all types, you cannot specify where they should be stored, because they are copied everytime they are used.
          // The types where the so-called storage location is important are structs and arrays. If you e.g. pass such variables in function calls, their data is not copied if it can stay in memory or stay in storage. This means that you can modify their content in the called function and these modifications will still be visible in the caller.
          // There are defaults for the storage location depending on which type of variable it concerns (source):
              // state variables are always in storage
              // function arguments are always in memory
              // local variables of struct, array or mapping type reference storage by default
              // local variables of value type (i.e. neither array, nor struct nor mapping) are stored in t

    uint numberOfArticlesForSale = 0;
    // iterate over articles
    for(uint i = 1; i <= articleCounter;  i++) {
      // keep the ID if the article is still for sale
      if(articles[i].buyer == 0x0) {
        articleIds[numberOfArticlesForSale] = articles[i].id;
        numberOfArticlesForSale++;
      }
    }

    // copy the articleIds array into a smaller forSale array
    uint[] memory forSale = new uint[](numberOfArticlesForSale);
    for(uint j = 0; j < numberOfArticlesForSale; j++) {
      forSale[j] = articleIds[j];
    }
    return forSale;
  }

  // buy an article
  function buyArticle(uint _id) external payable {
    // we check whether there is an article for sale
    require(articleCounter > 0, "ERROR: articleCounter is invalid (<0).");

    // we check that the article exists
    require(_id > 0 && _id <= articleCounter,"ERROR: article id is invalid.");

    // we retrieve the article
    Article storage article = articles[_id];

    // we check that the article has not been sold yet
    require(article.buyer == address(0x0),"ERROR: article has been sold.");

    // we don't allow the seller to buy his own article
    require(msg.sender != article.seller,"ERROR: we don't allow the seller to buy his own article.");

    // we check that the value sent corresponds to the price of the article
    require(msg.value == article.price,"ERROR: the value doesn't corresponds to the price of the article.");

    // keep buyer's information
    article.buyer = msg.sender;

    // the buyer can pay the seller
    article.seller.transfer(msg.value);

    // trigger the event
    emit LogBuyArticle(_id, article.seller, article.buyer, article.name, article.price);
  }
}
