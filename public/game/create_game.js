var createGame = function(elementNameOfInsertionPoint) {
  console.log("createGame" + Date.now());
  let gameSetupData = getGameSetupData();
  console.log("gameSetupData data =" + gameSetupData);

  var players = new Players(gameSetupData);
  console.log("Players:" + players.toString());


  let gameSetupRequestData = gameSetupRequest(gameSetupData);
  console.log("gameSetupRequestData = " + gameSetupRequestData);

  post("/game", gameSetupRequestData)
  .then(function(responseData){
    let gameElements = document.getElementById("initialization_content");
    parent = removeExistingContent(gameElements);
    displayGameDetails(parent, responseData);
    }, function(error){console.error("Create Game: Failed." + error);}
  );
};