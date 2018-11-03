App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,
  loading: false,
  loadingEvents: false,

  init: function () {
    console.log("Entering init ");
    return App.initWeb3();
  },
  initWeb3: function () {
    console.log("Entering initWeb3 ");
    // initialize web3
    if (typeof web3 !== 'undefined') {
      //reuse the provider of the Web3 object injected by Metamask
      App.web3Provider = web3.currentProvider;
      $('#connectedby').text("You are connected to BlockChain by METAMASK.  ");
    } else {
      //create a new provider and plug it directly into our local node
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      $('#connectedby').text("You are connected to BlockChain  DIRECTLY.");
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },
  connectDirectly: async function () {
    console.warn("HTTPProvider. Falling back to http://localhost:7545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    $('#connectedby').text("You are connected to BlockChain DIRECTLY. ");
    web3 = new Web3(App.web3Provider);
    return App.refreshAllInfo();
  },
  initContract: function () {
    console.log("Entering initContract ");
    $.getJSON('ChainStore.json', function (chainStoreArtifact) {
      // get the contract artifact file and use it to instantiate a truffle contract abstraction
      App.contracts.ChainStore = TruffleContract(chainStoreArtifact);
      // set the provider for our contracts
      App.contracts.ChainStore.setProvider(App.web3Provider);
      // listen to events and retrieve the article from the contract
      App.listenToEvents();
      return App.refreshAllInfo();
    });
  },
  refreshAllInfo: function () {
    console.log("Entering refreshAllInfo ");
    App.displayAccountInfo();    
    return App.reloadArticles();
  },
  displayAccountInfo: function () {
    console.log("Entering displayAccountInfo ");
    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
        if (account != null) {
          $('#account').text(" My account : " + account);
          web3.eth.getBalance(account, function (err, balance) {
            if (err === null) {
              $('#accountBalance').text(" My balance : " + web3.fromWei(balance, "ether") + " ETH");

              if (App.contracts.ChainStore != undefined) {
                App.contracts.ChainStore.deployed().then(function (instance) {
                  instance.getNumberOfArticles().then(function (result) {
                    $('#numberofarticles').text(" Number of Store Articles  : " + result);
                  }).catch(function (err) {
                    console.error(err);
                  });
                  instance.getArticlesForSale().then(function (result) {
                    $('#articlesforsale').text(" Articles for Sell  : " + result.length);
                  }).catch(function (err) {
                    console.error(err);
                  });
                });
              }
            }
          })
        }
      }
    });
  },
  reloadArticles: function () {
    console.log("Entering reloadArticle ");
    // avoid reentry
    if (App.loading) {
      return;
    }
    App.loading = true;
    var chainStoreInstance;
    App.contracts.ChainStore.deployed().then(function (instance) {
      chainStoreInstance = instance;
      return chainStoreInstance.getArticlesForSale();
    }).then(function (articleIds) {
      // retrieve the article placeholder and clear it
      $('#articlesRow').empty();
      for (var i = 0; i < articleIds.length; i++) {
        var articleId = articleIds[i];
        chainStoreInstance.articles(articleId.toNumber()).then(function (article) {
          App.displayArticle(article[0], article[1], article[3], article[4], article[5]);
        });
      }
      App.loading = false;
    }).catch(function (err) {
      console.error(err.message);
      App.loading = false;
    });
  },

  displayArticle: function (id, seller, name, description, price) {
    console.log("Entering displayArticle ");
    var articlesRow = $('#articlesRow');
    var etherPrice = web3.fromWei(price, "ether");
    var articleTemplate = $("#articleTemplate");
    articleTemplate.find('.panel-title').text(name);
    articleTemplate.find('.article-description').text(description);
    articleTemplate.find('.article-price').text(etherPrice + " ETH");
    articleTemplate.find('.btn-buy').attr('data-id', id);
    articleTemplate.find('.btn-buy').attr('data-value', etherPrice);

    // seller
    if (seller == App.account) {
      articleTemplate.find('.article-seller').text("You");
      articleTemplate.find('.btn-buy').hide();
    } else {
      articleTemplate.find('.article-seller').text(seller);
      articleTemplate.find('.btn-buy').show();
    }
    // add this new article
    articlesRow.append(articleTemplate.html());
  },
  listenToEvents: function () {  // listen to events triggered by the contract
    console.log("Entering listenToEvents ");
    App.contracts.ChainStore.deployed().then(function (instance) {
      instance.LogSellArticle({}, {}).watch(function (error, event) {
        console.log("event");
        if (!error) {
          $("#events").append('<li class="list-group-item">' + event.args._name + ' is now for sale</li>');
        } else {
          console.error(error);
        }
      });

      instance.LogBuyArticle({}, {}).watch(function (error, event) {
        if (!error) {
          $("#events").append('<li class="list-group-item">' + event.args._buyer + ' bought ' + event.args._name + '</li>');
        } else {
          console.error(error);
        }
      });
    });
  },
  sellArticle: function () {
    console.log("Entering sellArticle");
    //event.preventDefault();
    // retrieve the detail of the article
    var _article_name = $('#article_name').val();
    var _description = $('#article_description').val();
    var _price = web3.toWei(parseFloat($('#article_price').val() || 0), "ether");
    if ((_article_name.trim() == '') || (_price == 0)) {
      // nothing to sell
      return false;
    }   
    App.contracts.ChainStore.deployed().then(function (instance) {
      return instance.sellArticle(_article_name, _description, _price, {
        from: App.account,
        gas: 500000
      });
    }).then(function (result) {      
      console.log(result);
      App.refreshAllInfo();
    }).catch(function (error) {
      console.error(error);
    });
  },
  buyArticle: function () {
    console.log("Entering buyArticle ");
    event.preventDefault();
    // retrieve the article
    var _articleId = $(event.target).data('id');
    var _price = parseFloat($(event.target).data('value'));

    App.contracts.ChainStore.deployed().then(function (instance) {
      return instance.buyArticle(_articleId, {
        from: App.account,
        value: web3.toWei(_price, "ether"),
        gas: 500000
      });
    }).then(function (result) {
      console.log(result);
      App.refreshAllInfo();
    }).catch(function (error) {
      console.error(error);
    });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});


